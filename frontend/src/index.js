import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import boilerapp from 'boiler-frontend'
import Page from 'boiler-frontend/lib/components/Page'

import FolderReducer from 'folder-ui/lib/reducer'
import BasicTemplate from 'folder-ui/lib/templates/basic'
import LocalStorageDB from 'folder-ui/lib/db/localstorage'

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
    db:LocalStorageDB({
      name:'boilerstack.items',
      data:[{
        id:'root',
        name:'My Items'
      }]
    })
  })
}

boilerapp({
  mountElement:document.getElementById('mount'),
  reducers:{
    items:FolderReducer('items')
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