import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { combineReducers } from 'redux'

import ApiSaga from '../../sagas/api'

import { ApiActions, TableActions } from '../../actions'

import ApiReducer from '../../reducers/api'
import TableReducer from '../../reducers/table'

import { ContainerWrapper } from '../../tools'
import { tableItems } from '../../reducers/injectors'
import { virtualTable } from '../../reducers/selectors'

import ToolbarContent from '../../containers/ToolbarContent'
import Table from '../../components/Table'

const REQUIRED_SETTINGS = [
  'label',
  'actionPrefix',
  'selector',
  'getTitle',
  'getButtons',
  'getTableFields',
  'api'
]

const REQUIRED_API_SETTINGS = [
  'get'
]

const TableWidget = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  REQUIRED_API_SETTINGS.forEach(field => {
    if(!settings.api[field]) throw new Error(field + ' api method needed')
  })

  if(typeof(settings.multiSelectable) !== 'boolean') settings.multiSelectable = true

  const api = settings.api
  const actionPrefix = settings.actionPrefix

  const actions = {
    get:ApiActions(actionPrefix + '_TABLE_GET'),
    tools:TableActions(actionPrefix + '_TOOLS')
  }

  const reducer = combineReducers({
    get:ApiReducer(actions.get.types, tableItems),
    tools:TableReducer(actions.tools.types)
  })

  const mapRouteInfo = (routeInfo) => {
    return settings.mapRouteInfo ?
      settings.mapRouteInfo(routeInfo) :
      routeInfo
  }

  const getContainer = (store) => ContainerWrapper(ToolbarContent, {
    ContentComponent:Table,
    ToolbarComponent:settings.ToolbarComponent,
    initializeData:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      store.dispatch(actions.get.request())
    },
    getState:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      const state = settings.selector(store.getState())
      const table = virtualTable(state)
      return {
        title:settings.getTitle(state, routeInfo),
        data:table.getItems(),
        selected:table.selected,
        selectedItems:table.getSelectedItems()
      }
    },
    getInjectedProps:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      const state = settings.selector(store.getState())
      return {
        getIcon:settings.getIcon,
        buttons:settings.getButtons(state, store, routeInfo, actions),
        fields:settings.getTableFields(state, store, routeInfo),
        multiSelectable:settings.multiSelectable,
        onRowSelection:(idArray) => {
          store.dispatch(actions.tools.selected(idArray))
        }
      }
    }
  })

  const getSagas = (store) => {

    // load the table data
    const tableApiSaga = ApiSaga({
      name:settings.label + ':get',
      actions:actions.get,
      handler:api.get,
      injector:tableItems
    })

    return [
      tableApiSaga
    ]
  }


  return {
    actions,
    reducer,
    getContainer,
    getSagas
  }
}

export default TableWidget