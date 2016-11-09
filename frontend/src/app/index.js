import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import deep from 'deep-get-set'
deep.p = true
import boilerapp from 'boiler-frontend'
import Page from 'boiler-frontend/lib/components/Page'

import FolderReducer from 'folder-ui/lib/reducer'
import BasicTemplate from 'folder-ui/lib/templates/basic'
import CrudTemplate from 'folder-ui/lib/templates/crud'
import DiggerDB from 'digger-folder-ui-db'
import MemoryDB from 'folder-ui/lib/db/memory'
import CompositeDB from 'folder-ui/lib/db/composite'
import { getItemCodecId, decodeID } from 'folder-ui/lib/db/composite'

import MongoCrudDB from '../db/mongocrud'

import appreducer from './reducer'

import Schema from '../schema'

import About from './containers/About'
import Dashboard from './containers/Dashboard'

const databases = {
  core:{
    id:'core',
    readOnly:true,
    rootNode:{
      name:'System Resources'
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
  },
  projects:{
    id:'projects',
    rootNode:{
      name:'Projects'
    },
    db:MongoCrudDB({
      baseurl:'/api/v1/projects',
      inject:{
        _type:'project'
      }
    })
  }
}

const TABLE_LAYOUTS = {
  projects:'projects'
}

const schema = Schema({
  databases,
  getTableLayout:(context) => {
    if(!context.parent) return

    return TABLE_LAYOUTS[getItemCodecId(context.parent.id)]
  }
})


/*

  resources app
  
*/

const RESOURCE_APP_ID = 'resources'

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
      databases.user,
      databases.core
    ])
  })

  return BasicTemplate(resourcesProps)
}


/*

  project app
  
*/
const PROJECT_APP_ID = 'projects'

const ProjectRoutes = (auth) => {

  const projectDB = CompositeDB([
    databases.projects
  ])

  return CrudTemplate(Object.assign({}, schema, {
    name:PROJECT_APP_ID,
    path:'projects',
    enableTree:false,
    enableClipboard:false,
    onEnter:auth.user,
    db:projectDB,
    crudParent:projectDB.getRootNode('projects')
  }))
}

boilerapp({
  mountElement:document.getElementById('mount'),
  reducers:{
    [RESOURCE_APP_ID]:FolderReducer(RESOURCE_APP_ID),
    [PROJECT_APP_ID]:FolderReducer(PROJECT_APP_ID),
    app:appreducer
  },
  dashboard:Dashboard,
  userDetailsSchema:schema.types.user.fields,
  getRoutes:(auth) => {
    return (
      <Route>
        <Route component={Page}>
          <Route path="about" component={About} />
        </Route>
        {ResourceRoutes(auth)}
        {ProjectRoutes(auth)}
      </Route>
    )
  }
})