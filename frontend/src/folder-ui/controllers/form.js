import React, { Component, PropTypes } from 'react'
import { combineReducers } from 'redux'
import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'

import { getLabel } from '../tools'

import ApiSaga from '../sagas/api'

import ApiActions from '../actions/api'
import FormActions from '../actions/form'

import ApiReducer from '../reducers/api'
import FormReducer from '../reducers/form'

import {
  redirect
} from '../actions/router'

const REQUIRED_SETTINGS = [
  'id',
  'title',
  'selector',
  'redirects',
  'actionPrefix',
  'initialFormData',
  'api'
]

const REQUIRED_API_SETTINGS = [
  'get',
  'post',
  'put'
]

const FormController = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  REQUIRED_API_SETTINGS.forEach(field => {
    if(!settings.api[field]) throw new Error(field + ' api method needed')
  })

  const id = settings.id
  const title = settings.title
  const api = settings.api
  const redirects = settings.redirects
  const actionPrefix = settings.actionPrefix

  const userEventHandler = settings.userEventHandler ? 
    settings.userEventHandler :
    (store, userEvent) => {}

  // wrap the initial data for the form in a promise so it's a like an api call
  const getInitialData = () => {
    return new Promise((resolve, reject) => {
      resolve(settings.initialFormData || {})
    })
  }

  const actions = {
    get:ApiActions(actionPrefix + '_GET'),
    post:ApiActions(actionPrefix + '_POST'),
    put:ApiActions(actionPrefix + '_PUT'),
    meta:FormActions(actionPrefix + '_META')
  }

  const reducers = {
    get:ApiReducer(actions.get.types),
    post:ApiReducer(actions.post.types),
    put:ApiReducer(actions.put.types),
    meta:FormReducer(actions.meta.types)
  }

  const getTitle = (mode) => {
    const title = mode == 'post' ? 
      'New ' + settings.title :
      'Edit title'
  }

  const getReducer = () => {
    return combineReducers(reducers)
  }

  const getState = (state, routeInfo) => {
    state = settings.selector(state)
    return {
      title:getTitle(routeInfo.mode),
      data:state.meta.data,
      meta:state.meta.meta       
    }
  }

  const getSagas = (store) => {

    // the initial trigger to load some form data
    // add runs a sync local function
    // edit re-triggers an action for a saga to handle
    function* doRequestInitialFormData(action) {
      if(action.mode == 'put'){
        if(!action.params.id) throw new Error('no id param for form:edit -> requestData')
        // clear the data whilst we are loading
        yield put(actions.meta.initializeData({}))
        yield put(actions.get.request({
          id:action.params.id
        }))
      }
      else if(action.mode == 'post'){
        const initialData = yield call(getInitialData, action)
        yield put(actions.meta.initializeData(initialData || {}))
      }
      else{
        throw new Error('unknown form mode ' + mode)
      }
    }

    function* requestInitialFormData() {
      yield takeLatest(actions.meta.types.REQUEST_INITIAL_DATA, doRequestInitialFormData)
    }

    // get
    const getApi = ApiSaga({
      label:getLabel(title) + ':get',
      handler:api.get,
      actions:actions.get,
      trigger:actions.get.types.REQUEST
    })

    // copy the loaded data into the form
    function* doAfterGet(action) {
      yield put(actions.meta.initializeData(action.data))
    }

    function* afterGet() {
      yield takeLatest(actions.get.types.SUCCESS, doAfterGet)
    }


    // post
    const postApi = ApiSaga({
      label:getLabel(title) + ':post',
      handler:api.post,
      actions:actions.post,
      trigger:actions.post.types.REQUEST
    })

    // run user eventHandler
    // redirect to home
    function* doAfterPost(action) {
      yield call(userEventHandler, store, {
        message:'Created ' + action.data.name,
        snackbar:true,
        name:'post',
        action
      })
      yield put(redirect(redirects.home))
    }

    function* afterPost() {
      yield takeLatest(actions.post.types.SUCCESS, doAfterPost)
    }


    // put
    const putApi = ApiSaga({
      label:getLabel(title) + ':put',
      handler:api.put,
      actions:actions.put,
      trigger:actions.put.types.REQUEST
    })

    // run user eventHandler
    function* doAfterPut(action) {
      yield call(userEventHandler, store, {
        message:'Saved ' + action.data.name,
        snackbar:true,
        name:'put',
        action
      })
      yield put(redirect(redirects.home))
    }

    function* afterPut() {
      yield takeLatest(actions.put.types.SUCCESS, doAfterPut)
    }

    return [
      requestInitialFormData,
      getApi,
      afterGet,
      postApi,
      afterPost,
      putApi,
      afterPut
    ]

  }

  return {
    id,
    api,
    actions,
    getReducer,
    getState,
    getSagas
  }
}

export default FormController