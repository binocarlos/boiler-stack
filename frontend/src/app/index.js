import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import deep from 'deep-get-set'
deep.p = true
import boilerapp from 'boiler-frontend'
import Page from 'boiler-frontend/lib/components/Page'

import FolderReducer from 'folder-ui/lib/reducer'
import BasicTemplate from 'folder-ui/lib/templates/basic'
import DiggerDB from 'digger-folder-ui-db'
import MemoryDB from 'folder-ui/lib/db/memory'
import CompositeDB from 'folder-ui/lib/db/composite'
import { getItemCodecId, decodeID } from 'folder-ui/lib/db/composite'

import appreducer from './reducer'

import {
  USER_DETAILS,
  TYPES,
  TABLE_FIELDS,
  LIBRARY
} from '../schema'


import About from './containers/About'
import Dashboard from './containers/Dashboard'

/*

  a full folder-ui BasicTemplate that shows folder tree and editors
  for the a resources section
  
*/
const RESOURCE_APP_ID = 'resources'

const databases = {
  core:{
    id:'core',
    readOnly:true,
    rootNode:{
      name:'Core Resources'
    },
    db:DiggerDB({
      readOnly: true,
      // this database speaks to the core system
      baseurl:(context) => {
        return '/api/v1/digger/core/resources'
      }
    })
  },
  user:{
    id:'user',
    rootNode:{
      name:'My Resources'
    },
    db:DiggerDB({

      // what backend api url do we use depends upon the current project
      baseurl:(context) => {
        return '/api/v1/digger/' + context.params.projectid + '/resources'
      }
    })
  }
}

const ResourceRoutes = (auth) => {

  return BasicTemplate({

    // the schema types
    types:TYPES,

    // the fields to appear in the children table
    tableFields:TABLE_FIELDS,

    // the extra LIBRARY items for biro
    library:LIBRARY,

    // the reducer name
    name:RESOURCE_APP_ID,

    // the react-router frontend route path
    path:'resources/:projectid',

    // what function handles auth on entry
    onEnter:auth.user,

    // the database powering the api requests
    db:CompositeDB([
      databases.core,
      databases.user
    ]),

    // decide if the given item is editable
    // in this case - if it belongs to the core database
    // it is readonly
    isEditable:(item) => {
      const database = databases[getItemCodecId(item)] || {}
      return database.readOnly ? false : true
    },

    // remove the edit button for both the core databases
    filterActions:(context, actions) => {
      const parentID = decodeID(context.parent.id)
      const selected = context.selected || []
      let disableActions = {}

      // this means the current focus is a top-level database container
      if(databases[parentID]){
        disableActions.edit = selected.length<=0
      }

      return actions.filter(action => disableActions[action.id] ? false : true)
    },

    // we can inject properies from the schema descriptor and the parent
    // into new objects when they are added
    getNewItem:(parent, descriptor) => {
      return descriptor.initialData
    }

  })
}

boilerapp({
  mountElement:document.getElementById('mount'),
  reducers:{

    // the reducer for the resources app
    [RESOURCE_APP_ID]:FolderReducer(RESOURCE_APP_ID),

    // the generic app reducer
    app:appreducer
  },
  dashboard:Dashboard,
  userDetailsSchema:USER_DETAILS,
  getRoutes:(auth) => {
    return (
      <Route>
        <Route component={Page}>
          <Route path="about" component={About} />
        </Route>
        {ResourceRoutes(auth)}
      </Route>
    )
  }
})