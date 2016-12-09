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
  'loadData'
]

const TableWidget = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  const actionPrefix = settings.actionPrefix

  const actions = {
    load:ApiActions(actionPrefix + '_TABLE_LOAD'),
    tools:TableActions(actionPrefix + '_TOOLS')
  }

  const reducer = combineReducers({
    load:ApiReducer(actions.load.types),
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
    initialize:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      store.dispatch(actions.load.request())
    },
    getProps:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      const state = settings.selector(store.getState())
      return {
        toolbar:{
          title:settings.getTitle(state, routeInfo)
        },
        content:{
          data:state.load.data
        }
      }
    },
    getInjectedProps:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      const state = settings.selector(store.getState())
      return {
        toolbar:{
          buttons:settings.getButtons(state, store, routeInfo, actions)
        },
        content:{
          fields:settings.getTableFields(state, store, routeInfo),
          onRowSelection:(idArray) => {}
        }
      }
    }
  })

  const getSagas = (store) => {

    // load the table data
    const tableApiSaga = ApiSaga({
      actions:actions.load,
      trigger:actions.load.types.REQUEST,
      handler:(action) => settings.loadData(action)
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