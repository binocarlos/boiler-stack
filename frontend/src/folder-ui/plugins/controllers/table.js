import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'
import { combineReducers } from 'redux'
import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'

import { getLabel } from '../../tools'

import { multiApi } from './tools'
import ApiSaga from '../../sagas/api'

import ApiActions from '../../actions/api'
import ListActions from '../../actions/list'
import ConfirmDialogActions from '../../actions/confirmdialog'
import { redirect } from '../../actions/router'

import ApiReducer from '../../reducers/api'
import ListReducer from '../../reducers/list'
import ConfirmDialogReducer from '../../reducers/confirmdialog'
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
  'userEventHandler',
  'api'
]

const REQUIRED_API_SETTINGS = [
  'list',
  'delete'
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
  const userEventHandler = settings.userEventHandler

  const actions = {
    get:ApiActions(actionPrefix + '_GET'),
    meta:ListActions(actionPrefix + '_META'),
    confirmDelete:ConfirmDialogActions(actionPrefix + '_CONFIRM_DELETE')
  }

  const reducers = {
    get:ApiReducer(actions.get.types, tableItems),
    meta:ListReducer(actions.meta.types),
    confirmDelete:ConfirmDialogReducer(actions.confirmDelete.types)
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

  const getState = (state) => {
    state = settings.selector(state)
    const selected = state.meta.selected
    const data = state.get.data || {}
    const table = virtualTable(data.ids, data.db)
    const selectedItems = table.getSelectedItems(selected)
    const title = getTitle(selectedItems)
    const dialogOpen = state.confirmDelete.open
    return {
      title,
      selected,
      selectedItems,
      data:table.getItems(),
      dialogOpen:dialogOpen
    }
  }

  const sagas = (store) => {

    // load the table data
    const listApi = ApiSaga({
      label:getLabel(title) + ':list',
      handler:api.list,
      actions:actions.get,
      trigger:actions.get.types.REQUEST,
      injector:tableItems
    })

    function* doConfirmDelete(action) {
      const ids = action.data || []
      const deleteResults = yield call(multiApi, api.delete, ids.map(id => {
        return {
          query:{
            id
          }
        }
      }))
      yield put(actions.confirmDelete.close())
      yield put(actions.meta.selected([]))
      yield put(actions.get.request())
      yield call(userEventHandler, store, {
        message:'Deleted ' + ids.length + ' item' + (ids.length == 1 ? '' : 's'),
        snackbar:true,
        name:'delete',
        action
      })
    }

    function* confirmDelete() {
      yield takeLatest(actions.confirmDelete.types.CONFIRM, doConfirmDelete)
    }

    return [
      listApi,
      confirmDelete
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