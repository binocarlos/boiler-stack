import React, { Component, PropTypes } from 'react'

import { ContainerWrapper } from '../../tools'

import ToolbarContent from '../../containers/ToolbarContent'
import Form from '../../components/Form'

const REQUIRED_SETTINGS = [
  'actions',
  'selector',
  'getTitle',
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

  const mapRouteInfo = (routeInfo) => {
    return settings.mapRouteInfo ?
      settings.mapRouteInfo(routeInfo) :
      routeInfo
  }

  return (store, mode) => {

    const getState = (routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      routeInfo.mode = mode
      const state = settings.selector(store.getState())
      return {
        title:settings.getTitle(state, routeInfo),
        data:state.tools.data,
        meta:state.tools.meta       
      }
    }
    
    return ContainerWrapper(ToolbarContent, {
      ContentComponent:Form,
      // the trigger to load the data for this widget
      initializeData:(routeInfo) => {
        routeInfo = mapRouteInfo(routeInfo)
        store.dispatch(actions.requestInitialData(mode, routeInfo.params))
      },
      // state that would trigger a re-render
      getState:getState,
      getInjectedProps:(routeInfo) => {
        routeInfo = mapRouteInfo(routeInfo)
        routeInfo.mode = mode
        const state = getState(routeInfo)
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