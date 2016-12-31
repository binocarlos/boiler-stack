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

import MongoCrudDB from '../db/mongocrud'

import appreducer from '../reducer'

import Schema from '../schema'

import About from './containers/About'
import Dashboard from './containers/Dashboard'
import AppBarChildren from './containers/AppBarChildren'

import {
  getProjectData
} from '../actions'

import {
  getCurrentProject
} from '../tools'

const databases = {
  coreresources:{
    id:'coreresources',
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
  userresources:{
    id:'userresources',
    rootNode:{
      name:'My Resources'
    },
    db:DiggerDB({

      // what backend api url do we use depends upon the current project
      baseurl:(context) => {
        const projectID = getCurrentProject(context.state)
        return '/api/v1/digger/' + projectID + '/resources'
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
  },
  clients:{
    id:'clients',
    rootNode:{
      name:'Clients'
    },
    db:MongoCrudDB({
      baseurl:(context) => {
        const projectID = getCurrentProject(context.state)
        return '/api/v1/clients/' + projectID
      },
      inject:{
        _type:'client'
      }
    })
  },
  quotes:{
    id:'quotes',
    rootNode:{
      name:'Quotes'
    },
    db:MongoCrudDB({
      baseurl:(context) => {
        const projectID = getCurrentProject(context.state)
        return '/api/v1/quotes/' + projectID
      },
      inject:{
        _type:'quote'
      }
    })
  }
}

const resourceDatabase = CompositeDB([
  databases.userresources,
  databases.coreresources
])

const projectDatabase = CompositeDB([
  databases.projects
])

const clientDatabase = CompositeDB([
  databases.clients
])

const quoteDatabase = CompositeDB([
  databases.quotes
])

const schema = Schema({
  appid:'app',
  databases
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
    path:'resources',

    // only show folders in the tree
    treeQuery:'folder',

    // what function handles auth on entry
    onEnter:auth.user,

    // the database powering the api requests
    db:resourceDatabase
  })

  return BasicTemplate(resourcesProps)
}


/*

  project app
  
*/
const PROJECT_APP_ID = 'projects'

const loadProjectData = () => {
  return getProjectData(databases.projects.db)
}

const ProjectRoutes = (auth) => {
  return CrudTemplate(Object.assign({}, schema, {
    name:PROJECT_APP_ID,
    path:'projects',
    enableTree:false,
    enableClipboard:false,
    onEnter:auth.user,
    db:projectDatabase,
    crudParent:projectDatabase.getRootNode('projects'),

    // gets run when something about the projects has changed
    // re-load the project data that populates the appbar list
    eventListener:(event, dispatch) => {
      dispatch(loadProjectData())
    }
  }))
}

/*

  client app
  
*/
const CLIENT_APP_ID = 'clients'

const ClientRoutes = (auth) => {
  return CrudTemplate(Object.assign({}, schema, {
    name:CLIENT_APP_ID,
    path:'clients',
    enableTree:false,
    enableClipboard:false,
    onEnter:auth.user,
    db:clientDatabase,
    crudParent:clientDatabase.getRootNode('clients')
  }))
}


/*

  quote app
  
*/
const QUOTE_APP_ID = 'quotes'

const QuoteRoutes = (auth) => {
  return CrudTemplate(Object.assign({}, schema, {
    name:QUOTE_APP_ID,
    path:'quotes',
    enableTree:false,
    enableClipboard:false,
    onEnter:auth.user,
    db:quoteDatabase,
    crudParent:quoteDatabase.getRootNode('quotes')
  }))
}

boilerapp({
  appTitle:'QuoteRight',
  mountElement:document.getElementById('mount'),
  reducers:{
    [RESOURCE_APP_ID]:FolderReducer(RESOURCE_APP_ID),
    [PROJECT_APP_ID]:FolderReducer(PROJECT_APP_ID),
    [CLIENT_APP_ID]:FolderReducer(CLIENT_APP_ID),
    [QUOTE_APP_ID]:FolderReducer(QUOTE_APP_ID),
    app:appreducer
  },
  dashboard:Dashboard,
  userDetailsSchema:schema.types.user.fields,
  getMenuChildren:schema.getMenuChildren,
  getAppBarChildren:(children) => {
    return (
      <AppBarChildren loadProjectData={loadProjectData}>
        {children}
      </AppBarChildren>
    )
  },
  getRoutes:(auth) => {
    return (
      <Route>
        <Route component={Page}>
          <Route path="about" component={About} />
        </Route>
        {ResourceRoutes(auth)}
        {ProjectRoutes(auth)}
        {ClientRoutes(auth)}
        {QuoteRoutes(auth)}
      </Route>
    )
  }
})