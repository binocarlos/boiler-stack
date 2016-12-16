import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { combineReducers } from 'redux'
import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import ApiSaga from '../../sagas/api'
import { ApiActions, FormActions } from '../../actions'
import ApiReducer from '../../reducers/api'
import FormReducer from '../../reducers/form'

const REQUIRED_SETTINGS = [
  'label',
  'routes',
  'actionPrefix',
  'api'
]

const REQUIRED_API_SETTINGS = [
  'get',
  'post',
  'put',
  'initialData'
]

const REQUIRED_ROUTE_SETTINGS = [
  'home'
]

const FormController = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  REQUIRED_API_SETTINGS.forEach(field => {
    if(!settings.api[field]) throw new Error(field + ' api method needed')
  })

  REQUIRED_ROUTE_SETTINGS.forEach(field => {
    if(!settings.routes[field]) throw new Error(field + ' route needed')
  })

  const api = settings.api
  const routes = settings.routes
  const actionPrefix = settings.actionPrefix

  const actions = {
    get:ApiActions(actionPrefix + '_FORM_GET'),
    post:ApiActions(actionPrefix + '_FORM_POST'),
    put:ApiActions(actionPrefix + '_FORM_PUT'),
    tools:FormActions(actionPrefix + '_TOOLS')
  }

  const reducer = combineReducers({
    get:ApiReducer(actions.get.types),
    post:ApiReducer(actions.post.types),
    put:ApiReducer(actions.put.types),
    tools:FormReducer(actions.tools.types)
  })

  const getSagas = (store) => {

    // the initial trigger to load some form data
    // add runs a sync local function
    // edit re-triggers an action for a saga to handle
    function* requestFormData(action) {
      if(action.mode == 'put'){
        if(!action.params.id) throw new Error('no id param for form:edit -> requestData')
        // clear the data whilst we are loading
        yield put(actions.tools.initialize({}))
        yield put(actions.get.request({
          id:action.params.id
        }))
      }
      else if(action.mode == 'post'){
        const initialData = yield call(api.initialData, action)
        yield put(actions.tools.initialize(initialData || {}))
      }
      else{
        throw new Error('unknown form mode ' + mode)
      }
    }

    function* requestFormDataSaga() {
      yield takeLatest(actions.tools.types.FORM_REQUEST_DATA, requestFormData)
    }

    // redirect once they have added an item
    function* afterPost(action) {
      yield put(routerActions.push(routes.home))
    }

    function* afterPostSaga() {
      yield takeLatest(actions.post.types.SUCCESS, afterPost)
    }

    // copy the loaded data into the form
    function* afterGet(action) {
      yield put(actions.tools.initialize(action.data))
    }

    function* afterGetSaga() {
      yield takeLatest(actions.get.types.SUCCESS, afterGet)
    }

    const getSaga = ApiSaga({
      name:settings.label + ':get',
      actions:actions.get,
      handler:api.get
    })

    const postSaga = ApiSaga({
      name:settings.label + ':post',
      actions:actions.post,
      handler:api.post
    })

    const putSaga = ApiSaga({
      name:settings.label + ':put',
      actions:actions.put,
      handler:api.put
    })
    
    return [
      requestFormDataSaga,
      getSaga,
      postSaga,
      putSaga,
      afterPostSaga,
      afterGetSaga
    ]
  }

  return {
    actions,
    reducer,
    getSagas
  }
}

export default FormController