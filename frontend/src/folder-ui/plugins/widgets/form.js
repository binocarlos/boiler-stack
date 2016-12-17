import React, { Component, PropTypes } from 'react'

import { ContainerWrapper } from '../../tools'

import ToolbarContent from '../../containers/ToolbarContent'
import Form from '../../components/Form'

const REQUIRED_SETTINGS = [
  'actions',
  'getState',
  'getButtons',
  'getSchema'
]

const REQUIRED_ACTIONS = [
  'requestInitialData',
  'update'
]

const FormWidget = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  REQUIRED_ACTIONS.forEach(field => {
    if(!settings.actions[field]) throw new Error(field + ' action needed')
  })

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