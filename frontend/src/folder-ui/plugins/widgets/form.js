import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { combineReducers } from 'redux'

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
  'getSchema'
]

const FormWidget = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  const actionPrefix = settings.actionPrefix

  const actions = {
    load:ApiActions(actionPrefix + '_FORM_LOAD'),
    add:ApiActions(actionPrefix + '_FORM_ADD'),
    save:ApiActions(actionPrefix + '_FORM_SAVE'),
    tools:FormActions(actionPrefix + '_TOOLS')
  }

  const reducer = combineReducers({
    load:ApiReducer(actions.load.types),
    add:ApiReducer(actions.add.types),
    save:ApiReducer(actions.save.types),
    tools:FormReducer(actions.tools.types)
  })

  const mapRouteInfo = (routeInfo) => {
    return settings.mapRouteInfo ?
      settings.mapRouteInfo(routeInfo) :
      routeInfo
  }

  const getContainer = (store, mode) => ContainerWrapper(ToolbarContent, {
    ContentComponent:Form,
    initialize:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      routeInfo.mode = mode

      // do we need to load the form data?
      if(mode == 'edit'){
        if(!routeInfo.params.id) throw new Error('no id param for edit form')
        store.dispatch(actions.load.request({
          id:routeInfo.params.id
        }))
      }
      else if(mode == 'add'){
        const initialData = settings.getInitialData ?
          settings.getInitialData() :
          {}

        store.dispatch(actions.tools.initialize(initialData))
      }
      else{
        throw new Error('unknown form mode ' + mode)
      }
    },
    getProps:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      routeInfo.mode = mode
      const state = settings.selector(store.getState())
      return {
        toolbar:{
          title:settings.getTitle(state, routeInfo)
        },
        content:{
          data:state.tools.data,
          meta:state.tools.meta
        }
      }
    },
    getInjectedProps:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      routeInfo.mode = mode
      const state = settings.selector(store.getState())
      return {
        toolbar:{
          buttons:settings.getButtons(state, store, routeInfo, actions)
        },
        content:{
          schema:settings.getSchema(state, store, routeInfo),
          update:(data, meta) => store.dispatch(actions.tools.update(data, meta))
        }
      }
    }
  })

  const getSagas = (store) => {

    return [
      
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