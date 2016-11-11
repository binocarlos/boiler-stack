import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import deep from 'deep-get-set'
deep.p = true
import boilerapp from 'boiler-frontend'
import Page from 'boiler-frontend/lib/components/Page'

import FolderReducer from 'folder-ui/lib/reducer'
import BasicTemplate from 'folder-ui/lib/templates/basic'
import CrudTemplate from 'folder-ui/lib/templates/crud'
import QuoteTemplate from '../templates/quote'
import DiggerDB from 'digger-folder-ui-db'
import MemoryDB from 'folder-ui/lib/db/memory'
import CompositeDB from 'folder-ui/lib/db/composite'

import MongoCrudDB from '../db/mongocrud'
import QuoteDB from '../db/quote'

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
      baseurl:(context) => {
        const projectID = getCurrentProject(context.state)
        return '/api/v1/digger/' + projectID + '/resources'
      }
    })
  },
  coretemplates:{
    id:'coretemplates',
    readOnly:true,
    rootNode:{
      name:'System Templates'
    },
    db:DiggerDB({
      readOnly: true,
      baseurl:(context) => {
        return '/api/v1/digger/core/templates'
      }
    })
  },
  usertemplates:{
    id:'usertemplates',
    rootNode:{
      name:'My Templates'
    },
    db:DiggerDB({
      baseurl:(context) => {
        const projectID = getCurrentProject(context.state)
        return '/api/v1/digger/' + projectID + '/templates'
      }
    })
  },
  coreteams:{
    id:'coreteams',
    readOnly:true,
    rootNode:{
      name:'System Teams'
    },
    db:DiggerDB({
      readOnly: true,
      baseurl:(context) => {
        return '/api/v1/digger/core/teams'
      }
    })
  },
  userteams:{
    id:'userteams',
    rootNode:{
      name:'My Teams'
    },
    db:DiggerDB({
      baseurl:(context) => {
        const projectID = getCurrentProject(context.state)
        return '/api/v1/digger/' + projectID + '/teams'
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
  },
  quote:{
    id:'quote',
    rootNode:{
      name:'Quote'
    },
    db:QuoteDB({
      
    })
  }
}

const composites = {
  resources:CompositeDB([
    databases.userresources,
    databases.coreresources
  ]),
  templates:CompositeDB([
    databases.usertemplates,
    databases.coretemplates
  ]),
  teams:CompositeDB([
    databases.userteams,
    databases.coreteams
  ]),
  clients:CompositeDB([
    databases.clients
  ]),
  quotes:CompositeDB([
    databases.quotes
  ]),
  quote:CompositeDB([
    databases.quote
  ]),
  projects:CompositeDB([
    databases.projects
  ])
}

const schema = Schema({
  appid:'app',
  databases
})

const getFormContext = () => {
  return {
    loadClients:() => {
      return (dispatch, getState) => {
        dispatch(clientApp.actions.requestChildren({
          state:getState()
        }, 'clients_clients'))
      }
    }
  }
}

const loadProjectData = () => {
  return getProjectData(databases.projects.db)
}


/*

  apps
  
*/
const resourceApp = BasicTemplate(Object.assign({}, schema, {
  name:'resources',
  path:'resources',
  treeQuery:'folder',
  showTableHeader:true,
  getFormContext:getFormContext,
  db:composites.resources
}))

const templateApp = BasicTemplate(Object.assign({}, schema, {
  name:'templates',
  path:'templates',
  treeQuery:'folder',
  getFormContext:getFormContext,
  db:composites.templates
}))

const teamApp = BasicTemplate(Object.assign({}, schema, {
  name:'teams',
  path:'teams',
  treeQuery:'folder',
  getFormContext:getFormContext,
  db:composites.teams
}))

const clientApp = CrudTemplate(Object.assign({}, schema, {
  name:'clients',
  path:'clients',
  enableTree:false,
  enableClipboard:false,
  db:composites.clients,
  crudParent:composites.clients.getRootNode('clients'),
  getFormContext:getFormContext
}))

const quotesApp = CrudTemplate(Object.assign({}, schema, {
  name:'quotes',
  path:'quotes',
  enableTree:false,
  enableClipboard:false,
  db:composites.quotes,
  crudParent:composites.quotes.getRootNode('quotes'),
  getFormContext:getFormContext
}))


const quoteApp = QuoteTemplate(Object.assign({}, schema, {
  name:'quote',
  path:'quote/:quoteid',
  treeQuery:'folder',
  showTableHeader:true,
  getFormContext:getFormContext,
  db:composites.quote
}))

const projectApp = CrudTemplate(Object.assign({}, schema, {
  name:'projects',
  path:'projects',
  enableTree:false,
  enableClipboard:false,
  db:composites.projects,
  crudParent:composites.projects.getRootNode('projects'),
  getFormContext:getFormContext,
  // gets run when something about the projects has changed
  // re-load the project data that populates the appbar list
  eventListener:(event, dispatch) => {
    dispatch(loadProjectData())
  }
}))



boilerapp({
  appTitle:'QuoteRight',
  mountElement:document.getElementById('mount'),
  reducers:{
    [resourceApp.name]:FolderReducer(resourceApp.name),
    [templateApp.name]:FolderReducer(templateApp.name),
    [teamApp.name]:FolderReducer(teamApp.name),
    [clientApp.name]:FolderReducer(clientApp.name),
    [quotesApp.name]:FolderReducer(quotesApp.name),
    [quoteApp.name]:FolderReducer(quoteApp.name),
    [projectApp.name]:FolderReducer(projectApp.name),
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
        {resourceApp.getRoutes(auth.user)}
        {templateApp.getRoutes(auth.user)}
        {teamApp.getRoutes(auth.user)}
        {clientApp.getRoutes(auth.user)}
        {quotesApp.getRoutes(auth.user)}
        {quoteApp.getRoutes(auth.user)}
        {projectApp.getRoutes(auth.user)}
      </Route>
    )
  }
})