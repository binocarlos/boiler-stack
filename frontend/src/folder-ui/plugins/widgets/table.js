import React, { Component, PropTypes } from 'react'

import { ContainerWrapper } from '../../tools'
import { virtualTable } from '../../reducers/selectors'

import ToolbarContent from '../../containers/ToolbarContent'

import Table from '../../components/Table'

const REQUIRED_SETTINGS = [
  'actions',
  'getState',
  'getButtons',
  'getTableFields'
]

const REQUIRED_ACTIONS = [
  'requestInitialData',
  'selected'
]

const TableWidget = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  REQUIRED_ACTIONS.forEach(field => {
    if(!settings.actions[field]) throw new Error(field + ' action needed')
  })

  if(typeof(settings.multiSelectable) !== 'boolean') settings.multiSelectable = true

  const actions = settings.actions
  const getStatics = settings.getStatics ?
    settings.getStatics :
    (state, store) => null

  return (store) => {
    return ContainerWrapper(ToolbarContent, {
      ContentComponent:Table,
      ToolbarComponent:settings.ToolbarComponent,
      initializeData:(routeInfo = {}) => {
        store.dispatch(actions.requestInitialData())
      },
      getState:(routeInfo = {}) => settings.getState(store.getState(), routeInfo),
      getInjectedProps:(routeInfo = {}) => {
        const state = settings.getState(store.getState(), routeInfo)
        return {
          getIcon:settings.getIcon,
          buttons:settings.getButtons(state, store, routeInfo),
          fields:settings.getTableFields(state, store, routeInfo),
          multiSelectable:settings.multiSelectable,
          showHeader:true,
          onRowSelection:(idArray) => store.dispatch(actions.selected(idArray)),
          statics:getStatics(state, store)
        }
      }
    })
  }
}

export default TableWidget