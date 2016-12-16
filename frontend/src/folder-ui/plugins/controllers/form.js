import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux'
import { combineReducers } from 'redux'
import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'

import { getLabel } from '../../tools'

import ApiSaga from '../../sagas/api'

import ApiActions from '../../actions/api'
import FormActions from '../../actions/form'
import { redirect } from '../../actions/router'

import ApiReducer from '../../reducers/api'
import FormReducer from '../../reducers/form'

const REQUIRED_SETTINGS = [
  'title',
  'selector',
  'route',
  'redirects',
  'reducerName',
  'actionPrefix',
  'api'
]

const REQUIRED_API_SETTINGS = [
  'get',
  'post',
  'put',
  'getInitialData'
]

const FormController = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  REQUIRED_API_SETTINGS.forEach(field => {
    if(!settings.api[field]) throw new Error(field + ' api method needed')
  })

  const title = settings.title
  const api = settings.api
  const route = settings.route
  const redirects = settings.redirects
  const reducerName = settings.reducerName
  const actionPrefix = settings.actionPrefix

  const actions = {
    get:ApiActions(actionPrefix + '_FORM_GET'),
    post:ApiActions(actionPrefix + '_FORM_POST'),
    put:ApiActions(actionPrefix + '_FORM_PUT'),
    tools:FormActions(actionPrefix + '_TOOLS')
  }

  const reducers = {
    get:ApiReducer(actions.get.types),
    post:ApiReducer(actions.post.types),
    put:ApiReducer(actions.put.types),
    tools:FormReducer(actions.tools.types)
  }

  const getState = (store, routeInfo) => {
    const state = settings.selector(store.getState())
    const title = routeInfo.mode == 'post' ? 
      'New ' + settings.title :
      'Edit title'
    return {
      title,
      data:state.tools.data,
      meta:state.tools.meta       
    }
  }

  const sagas = (store) => {

    // the initial trigger to load some form data
    // add runs a sync local function
    // edit re-triggers an action for a saga to handle
    function* requestInitialFormData(action) {
      if(action.mode == 'put'){
        if(!action.params.id) throw new Error('no id param for form:edit -> requestData')
        // clear the data whilst we are loading
        yield put(actions.tools.initializeData({}))
        yield put(actions.get.request({
          id:action.params.id
        }))
      }
      else if(action.mode == 'post'){
        const initialData = yield call(api.getInitialData, action)
        yield put(actions.tools.initializeData(initialData || {}))
      }
      else{
        throw new Error('unknown form mode ' + mode)
      }
    }

    function* requestInitialFormDataSaga() {
      yield takeLatest(actions.tools.types.FORM_REQUEST_INITIAL_DATA, requestInitialFormData)
    }

    // redirect once they have added an item
    function* afterPost(action) {
      yield put(redirect(redirects.home))
    }

    function* afterPostSaga() {
      yield takeLatest(actions.post.types.SUCCESS, afterPost)
    }

    // copy the loaded data into the form
    function* afterGet(action) {
      yield put(actions.tools.initializeData(action.data))
    }

    function* afterGetSaga() {
      yield takeLatest(actions.get.types.SUCCESS, afterGet)
    }

    const getSaga = ApiSaga({
      label:getLabel(title) + ':get',
      handler:api.get,
      actions:actions.get,
      trigger:actions.get.types.REQUEST
    })

    const postSaga = ApiSaga({
      label:getLabel(title) + ':post',
      handler:api.post,
      actions:actions.post,
      trigger:actions.post.types.REQUEST
    })

    const putSaga = ApiSaga({
      label:getLabel(title) + ':put',
      handler:api.put,
      actions:actions.put,
      trigger:actions.put.types.REQUEST
    })

    return [
      getSaga,
      postSaga,
      putSaga,
      requestInitialFormDataSaga,
      afterPostSaga,
      afterGetSaga
    ]
  }

  return {
    actions,
    reducers,
    getState,
    sagas
  }
}

export default FormController