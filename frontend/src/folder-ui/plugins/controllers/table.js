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
import { virtualTable } from '../../reducers/selectors'

import {
  tableItems
} from '../../reducers/injectors'

const REQUIRED_SETTINGS = [
  'title',
  'selector',
  'pluralTitle',
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
  const pluralTitle = settings.pluralTitle
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

  const getTitle = (selected) => {
    if(selected.length<=0){
      return pluralTitle
    }
    else if(selected.length==1){
      return selected[0].name
    }
    else {
      return selected.length + ' ' + pluralTitle.toLowerCase()
    }
  }

  const getState = (store, routeInfo) => {
    const state = settings.selector(store.getState())
    const selected = state.list.selected
    const data = state.get.data || {}
    const table = virtualTable(data.ids, data.db)
    const selectedItems = table.getSelectedItems(selected)
    const title = getTitle(selectedItems)
    return {
      title,
      selected,
      selectedItems,
      data:table.getItems()
    }
  }

  const sagas = (store) => {

    // load the table data
    const listApiSaga = ApiSaga({
      label:getLabel(title) + ':list',
      handler:api.list,
      actions:actions.get,
      trigger:actions.get.types.REQUEST,
      injector:tableItems
    })

    return [
      listApiSaga
    ]
  }

  return {
    actions,
    reducers,
    getState,
    sagas
  }
}

export default TableController