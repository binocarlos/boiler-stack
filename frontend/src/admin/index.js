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


const resourceDatabase = CompositeDB([
  databases.coreresources
])

const templateDatabase = CompositeDB([
  databases.coretemplates
])

const gangDatabase = CompositeDB([
  databases.coregangs
])

const userDatabase = CompositeDB([
  databases.users
])

const schema = Schema({
  appid:'admin',
  databases
})

const RESOURCE_APP_ID = 'resources'

const ResourceRoutes = (auth) => {

  const resourcesProps = Object.assign({}, schema, {
    name:RESOURCE_APP_ID,
    path:'resources',
    treeQuery:'folder',
    onEnter:auth.user,
    db:resourceDatabase
  })

  return BasicTemplate(resourcesProps)
}

const TEMPLATE_APP_ID = 'templates'

const TemplateRoutes = (auth) => {

  const templatesProps = Object.assign({}, schema, {
    name:TEMPLATE_APP_ID,
    path:'templates',
    treeQuery:'folder',
    onEnter:auth.user,
    db:templateDatabase
  })

  return BasicTemplate(templatesProps)
}

const GANG_APP_ID = 'gangs'

const GangRoutes = (auth) => {

  const gangsProps = Object.assign({}, schema, {
    name:GANG_APP_ID,
    path:'gangs',
    treeQuery:'folder',
    onEnter:auth.user,
    db:gangDatabase
  })

  return BasicTemplate(gangsProps)
}

const USER_APP_ID = 'users'

const UserRoutes = (auth) => {

  return CrudTemplate(Object.assign({}, schema, {
    name:USER_APP_ID,
    path:'users',
    enableTree:false,
    enableClipboard:false,
    onEnter:auth.user,
    db:userDatabase,
    crudParent:userDatabase.getRootNode('users'),

    // reload the user status if anything changes in the user-table
    eventListener:(event, dispatch) => {
      dispatch(refreshUser())
    }
  }))
}

boilerapp({
  appTitle:'QuoteRight Admin',
  mountElement:document.getElementById('mount'),
  reducers:{
    [RESOURCE_APP_ID]:FolderReducer(RESOURCE_APP_ID),
    [TEMPLATE_APP_ID]:FolderReducer(TEMPLATE_APP_ID),
    [USER_APP_ID]:FolderReducer(USER_APP_ID),
    [GANG_APP_ID]:FolderReducer(GANG_APP_ID),
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
        {ResourceRoutes(auth)}
        {TemplateRoutes(auth)}
        {UserRoutes(auth)}
        {GangRoutes(auth)}
      </Route>
    )
  }
})