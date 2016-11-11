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
import CompositeDB from 'folder-ui/lib/db/composite'
import { getItemCodecId, decodeID } from 'folder-ui/lib/db/composite'

import MongoCrudDB from '../db/mongocrud'

import appreducer from '../reducer'

import Schema from '../schema'

import Dashboard from './containers/Dashboard'

import {
  refreshUser
} from '../actions'

const databases = {
  coreresources:{
    id:'coreresources',
    rootNode:{
      name:'System Resources'
    },
    db:DiggerDB({
      baseurl:(context) => {
        return '/api/v1/digger/core/resources'
      }
    })
  },
  coretemplates:{
    id:'coretemplates',
    rootNode:{
      name:'System Templates'
    },
    db:DiggerDB({
      baseurl:(context) => {
        return '/api/v1/digger/core/templates'
      }
    })
  },
  coregangs:{
    id:'coregangs',
    readOnly:true,
    rootNode:{
      name:'System Gangs'
    },
    db:DiggerDB({
      readOnly: true,
      baseurl:(context) => {
        return '/api/v1/digger/core/gangs'
      }
    })
  },
  users:{
    id:'users',
    rootNode:{
      name:'Users'
    },
    db:MongoCrudDB({
      baseurl:'/api/v1/users',
      inject:{
        _type:'user'
      }
    })
  }
}

const composites = {
  resources:CompositeDB([
    databases.coreresources
  ]),
  templates:CompositeDB([
    databases.coretemplates
  ]),
  gangs:CompositeDB([
    databases.coregangs
  ]),  
  users:CompositeDB([
    databases.users
  ])
}

const schema = Schema({
  appid:'admin',
  databases
})

const getFormContext = () => {
  return {
    databases:databases
  }
}

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

const gangApp = BasicTemplate(Object.assign({}, schema, {
  name:'gangs',
  path:'gangs',
  treeQuery:'folder',
  getFormContext:getFormContext,
  db:composites.gangs
}))

const userApp = CrudTemplate(Object.assign({}, schema, {
  name:'users',
  path:'users',
  enableTree:false,
  enableClipboard:false,
  db:composites.users,
  crudParent:userDatabase.getRootNode('users'),

  // reload the user status if anything changes in the user-table
  eventListener:(event, dispatch) => {
    dispatch(refreshUser())
  }
}))


boilerapp({
  appTitle:'QuoteRight Admin',
  mountElement:document.getElementById('mount'),
  reducers:{
    [resourceApp.name]:FolderReducer(resourceApp.name),
    [templateApp.name]:FolderReducer(templateApp.name),
    [gangApp.name]:FolderReducer(gangApp.name),
    [userApp.name]:FolderReducer(userApp.name),
    app:appreducer
  },
  dashboard:Dashboard,
  userDetailsSchema:schema.types.user.fields,
  getMenuChildren:schema.getMenuChildren,
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

        </Route>
        {resourceApp.getRoutes(auth.user)}
        {templateApp.getRoutes(auth.user)}
        {gangApp.getRoutes(auth.user)}
        {userApp.getRoutes(auth.user)}
      </Route>
    )
  }
})