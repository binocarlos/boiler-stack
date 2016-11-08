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

import appreducer from './reducer'

import Schema from '../schema'

import Dashboard from './containers/Dashboard'
import Users from './containers/Users'

/*

  a full folder-ui BasicTemplate that shows folder tree and editors
  for the a resources section
  
*/
const RESOURCE_APP_ID = 'resources'

const databases = {
  core:{
    id:'core',
    rootNode:{
      name:'System Resources'
    },
    db:DiggerDB({

      // this database speaks to the core system
      baseurl:(context) => {
        return '/api/v1/digger/core/resources'
      }
    })
  }
}

const schema = Schema({
  databases
})

const ResourceRoutes = (auth) => {

  const resourcesProps = Object.assign({}, schema, {
    // the reducer name
    name:RESOURCE_APP_ID,

    // the react-router frontend route path
    path:'resources/:projectid',

    // only show folders in the tree
    treeQuery:'folder',

    // what function handles auth on entry
    onEnter:auth.user,

    // the database powering the api requests
    db:CompositeDB([
      databases.core
    ])
  })

  return BasicTemplate(resourcesProps)
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
  userDetailsSchema:schema.types.user.fields,
  /*
  
    only super-admin users can access the admin app
    
  */
  userFilter:(user) => {
    return user.accesslevel == 'superadmin'
  },
  getRoutes:(auth) => {
    return (
      <Route>
        <Route component={Page}>
          <Route path="users" component={Users} />
        </Route>
        {ResourceRoutes(auth)}
      </Route>
    )
  }
})