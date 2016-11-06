import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import boilerapp from 'boiler-frontend'
import Page from 'boiler-frontend/lib/components/Page'

import FolderReducer from 'folder-ui/lib/reducer'
import BasicTemplate from 'folder-ui/lib/templates/basic'
import DiggerDB from 'digger-folder-ui-db'
import MemoryDB from 'folder-ui/lib/db/memory'
import CompositeDB from 'folder-ui/lib/db/composite'

import appreducer from './reducer'

import {
  USER_DETAILS,
  TYPES,
  TABLE_FIELDS,
  LIBRARY
} from './schema'

import About from './containers/About'
import Dashboard from './containers/Dashboard'

const ItemRoutes = (auth) => {
  return BasicTemplate({
    types:TYPES,
    tableFields:TABLE_FIELDS,
    library:LIBRARY,
    name:'items',
    path:'items',
    onEnter:auth.user,
    db:CompositeDB([{
      id:'items',
      rootNode:{
        name:'My Items'
      },
      db:DiggerDB({
        base:'/api/v1/resources/apples/pears'
      })
    },{
      id:'itemsm',
      rootNode:{
        name:'My Items (M)'
      },
      db:MemoryDB()
    }])
  })
}

boilerapp({
  mountElement:document.getElementById('mount'),
  reducers:{
    items:FolderReducer('items'),
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
        {ItemRoutes(auth)}
      </Route>
    )
  }
})