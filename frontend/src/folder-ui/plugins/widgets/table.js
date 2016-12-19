import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'
import { ContainerWrapper } from '../../tools'
import { virtualTable } from '../../reducers/selectors'

import ToolbarContent from '../../containers/ToolbarContent'

import Table from '../../components/Table'

const REQUIRED_SETTINGS = [
  
  'getState',
  'getButtons',
  'getTableFields',
  'actions.requestInitialData',
  'actions.selected'
]

const TableWidget = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

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