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
    db:CompositeDB([
      databases.core
    ])
  })

  return BasicTemplate(resourcesProps)
}

const USER_APP_ID = 'users'

const UserRoutes = (auth) => {

  const userDB = CompositeDB([
    databases.users
  ])

  return CrudTemplate(Object.assign({}, schema, {
    name:USER_APP_ID,
    path:'users',
    enableTree:false,
    enableClipboard:false,
    onEnter:auth.user,
    db:userDB,
    crudParent:userDB.getRootNode('users'),

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
    [USER_APP_ID]:FolderReducer(USER_APP_ID),
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
        {UserRoutes(auth)}
      </Route>
    )
  }
})