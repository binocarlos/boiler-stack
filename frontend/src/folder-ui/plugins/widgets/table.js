import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { combineReducers } from 'redux'

import ApiSaga from '../../sagas/api'

import { ApiActions, TableActions } from '../../actions'

import ApiReducer from '../../reducers/api'
import TableReducer from '../../reducers/table'

import { ContainerWrapper } from '../../tools'

import ToolbarContent from '../../containers/ToolbarContent'
import Table from '../../components/Table'

const REQUIRED_SETTINGS = [
  'actionPrefix',
  'selector',
  'getTitle',
  'getButtons',
  'getTableFields',
  'api'
]

const REQUIRED_API_SETTINGS = [
  'loadData'
]

const TableWidget = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  REQUIRED_API_SETTINGS.forEach(field => {
    if(!settings.api[field]) throw new Error(field + ' api method needed')
  })

  const api = settings.api
  const actionPrefix = settings.actionPrefix

  const actions = {
    get:ApiActions(actionPrefix + '_TABLE_GET'),
    tools:TableActions(actionPrefix + '_TOOLS')
  }

  const reducer = combineReducers({
    get:ApiReducer(actions.get.types),
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
      return {
        title:settings.getTitle(state, routeInfo),
        data:state.get.data
      }
    },
    getInjectedProps:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      const state = settings.selector(store.getState())
      return {
        getIcon:settings.getIcon,
        buttons:settings.getButtons(state, store, routeInfo, actions),
        fields:settings.getTableFields(state, store, routeInfo),
        onRowSelection:(idArray) => {}
      }
    }
  })

  const getSagas = (store) => {

    // load the table data
    const tableApiSaga = ApiSaga({
      actions:actions.get,
      handler:api.loadData
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