import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'
import { combineReducers } from 'redux'
import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'

import { getLabel } from '../../tools'

import ApiSaga from '../../sagas/api'

import ApiActions from '../../actions/api'
import ListActions from '../../actions/list'
import { redirect } from '../../actions/router'

import ApiReducer from '../../reducers/api'
import ListReducer from '../../reducers/list'

import {
  tableItems
} from '../../reducers/injectors'

const REQUIRED_SETTINGS = [
  'title',
  'route',
  'reducerName',
  'actionPrefix',
  'api'
]

const REQUIRED_API_SETTINGS = [
  'list'
]

const TableController = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  REQUIRED_API_SETTINGS.forEach(field => {
    if(!settings.api[field]) throw new Error(field + ' api method needed')
  })

  const title = settings.title
  const api = settings.api
  const route = settings.route
  const reducerName = settings.reducerName
  const actionPrefix = settings.actionPrefix

  const actions = {
    get:ApiActions(actionPrefix + '_TABLE_GET'),
    list:ListActions(actionPrefix + '_LIST')
  }

  const reducers = {
    get:ApiReducer(actions.get.types, tableItems),
    list:ListReducer(actions.list.types)
  }

  const sagas = (store) => {

    // load the table data
    const listApiSaga = ApiSaga({
      label:getLabel(title) + ':list',
      handler:api.list,
      actions:actions.get,
      trigger:actions.get.types.REQUEST,
      injector:settings.injector
    })

    return [
      listApiSaga
    ]
  }

  return {
    actions,
    reducers,
    sagas
  }
}

export default TableController