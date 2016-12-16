import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { combineReducers } from 'redux'

import ApiSaga from '../../sagas/api'
import { ApiActions, TableActions } from '../../actions'
import ApiReducer from '../../reducers/api'
import TableReducer from '../../reducers/table'

import { tableItems } from '../../reducers/injectors'

const REQUIRED_SETTINGS = [
  'label',
  'actionPrefix',
  'api'
]

const REQUIRED_API_SETTINGS = [
  'get'
]

const TableController = (settings = {}) => {

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
    get:ApiReducer(actions.get.types, tableItems),
    tools:TableReducer(actions.tools.types)
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
    getSagas
  }
}

export default TableController