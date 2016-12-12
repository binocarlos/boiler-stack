import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { combineReducers } from 'redux'
import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import ApiSaga from '../../sagas/api'

import { ApiActions, FormActions } from '../../actions'

import ApiReducer from '../../reducers/api'
import FormReducer from '../../reducers/form'

import { ContainerWrapper } from '../../tools'

import ToolbarContent from '../../containers/ToolbarContent'
import Form from '../../components/Form'

const REQUIRED_SETTINGS = [
  'label',
  'route',
  'actionPrefix',
  'selector',
  'getTitle',
  'getButtons',
  'getSchema',
  'api'
]

const REQUIRED_API_SETTINGS = [
  'get',
  'post',
  'put',
  'initialData'
]

const FormWidget = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  REQUIRED_API_SETTINGS.forEach(field => {
    if(!settings.api[field]) throw new Error(field + ' api method needed')
  })

  const api = settings.api
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

  const mapRouteInfo = (routeInfo) => {
    return settings.mapRouteInfo ?
      settings.mapRouteInfo(routeInfo) :
      routeInfo
  }

  const getContainer = (store, mode) => ContainerWrapper(ToolbarContent, {
    ContentComponent:Form,
    // the trigger to load the data for this widget
    initializeData:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      store.dispatch(actions.tools.requestData(mode, routeInfo.params))
    },
    // state that would trigger a re-render
    getState:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      routeInfo.mode = mode
      const state = settings.selector(store.getState())
      return {
        title:settings.getTitle(state, routeInfo),
        data:state.tools.data,
        meta:state.tools.meta       
      }
    },
    getInjectedProps:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      routeInfo.mode = mode
      const state = settings.selector(store.getState())
      const buttons = settings.getButtons(state, store, routeInfo, actions)
      return {
        buttons,
        getIcon:settings.getIcon,
        schema:settings.getSchema(state, store, routeInfo),
        update:(data, meta) => store.dispatch(actions.tools.update(data, meta))
      }
    }
  })

  const getSagas = (store) => {

    // the initial trigger to load some form data
    // add runs a sync local function
    // edit re-triggers an action for a saga to handle
    function* requestFormData(action) {
      if(action.mode == 'put'){
        if(!action.params.id) throw new Error('no id param for form:edit -> requestData')
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

    }

    function* afterPostSaga() {
      yield takeLatest(actions.tools.types.FORM_REQUEST_DATA, requestFormData)
    }

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
      postSaga,
      putSaga
    ]
  }


  return {
    actions,
    reducer,
    getContainer,
    getSagas
  }
}

export default FormWidget