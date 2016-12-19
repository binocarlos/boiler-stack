import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'
import { ContainerWrapper } from '../../tools'

import ToolbarContent from '../../containers/ToolbarContent'
import Form from '../../components/Form'

const REQUIRED_SETTINGS = [
  'getState',
  'getButtons',
  'getSchema',
  'actions.requestInitialData',
  'actions.update'
]

const FormWidget = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = settings.actions

  return (store, mode) => {
    return ContainerWrapper(ToolbarContent, {
      ContentComponent:Form,
      // the trigger to load the data for this widget
      initializeData:(routeInfo = {}) => {
        store.dispatch(actions.requestInitialData(mode, routeInfo.params))
      },
      getState:(routeInfo = {}) => {
        routeInfo.mode = mode
        return settings.getState(store.getState(), routeInfo)
      },
      getInjectedProps:(routeInfo = {}) => {
        routeInfo.mode = mode
        const state = settings.getState(store.getState(), routeInfo)
        return {
          getIcon:settings.getIcon,
          buttons:settings.getButtons(state, store, routeInfo),
          schema:settings.getSchema(state, store, routeInfo),
          update:(data, meta) => store.dispatch(actions.update(data, meta))
        }
      }
    })
  }
}

export default FormWidget