import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { combineReducers } from 'redux'
import { takeLatest } from 'redux-saga'

import ApiSaga from '../../sagas/api'

import { ApiActions, FormActions } from '../../actions'

import ApiReducer from '../../reducers/api'
import FormReducer from '../../reducers/form'

import { ContainerWrapper } from '../../tools'

import ToolbarContent from '../../containers/ToolbarContent'
import Form from '../../components/Form'

const REQUIRED_SETTINGS = [
  'actionPrefix',
  'selector',
  'getTitle',
  'getButtons',
  'getSchema',
  'api'
]

const REQUIRED_API_SETTINGS = [
  'addItem',
  'editItem',
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
      if(action.mode == 'edit'){
        if(!action.params.id) throw new Error('no id param for form:edit -> requestData')
        store.dispatch(actions.get.request({
          id:action.params.id
        }))
      }
      else if(action.mode == 'add'){
        const initialData = api.initialData(action) || {}
        store.dispatch(actions.tools.initialize(initialData))
      }
      else{
        throw new Error('unknown form mode ' + mode)
      }
    }

    function* requestFormDataSaga() {
      yield takeLatest(actions.tools.types.FORM_REQUEST_DATA, requestFormData)
    }

    const addItemSaga = ApiSaga({
      actions:actions.post,
      handler:api.addItem
    })

    const editItemSaga = ApiSaga({
      actions:actions.put,
      handler:api.editItem
    })
    
    return [
      requestFormDataSaga,
      addItemSaga,
      editItemSaga
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