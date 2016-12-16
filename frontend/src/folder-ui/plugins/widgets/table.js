import React, { Component, PropTypes } from 'react'

import { ContainerWrapper } from '../../tools'

import ToolbarContent from '../../containers/ToolbarContent'
import Table from '../../components/Table'

const REQUIRED_SETTINGS = [
  'selector',
  'getTitle',
  'getButtons',
  'getTableFields'
]

const REQUIRED_ACTIONS = [
  'requestData',
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

  const mapRouteInfo = (routeInfo) => {
    return settings.mapRouteInfo ?
      settings.mapRouteInfo(routeInfo) :
      routeInfo
  }

  return (store) => ContainerWrapper(ToolbarContent, {
    ContentComponent:Table,
    ToolbarComponent:settings.ToolbarComponent,
    initializeData:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      store.dispatch(actions.get.request())
    },
    getState:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      const state = settings.selector(store.getState())
      const table = virtualTable(state)
      return {
        title:settings.getTitle(state, routeInfo),
        data:table.getItems(),
        selected:table.selected,
        selectedItems:table.getSelectedItems()
      }
    },
    getInjectedProps:(routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      const state = settings.selector(store.getState())
      return {
        getIcon:settings.getIcon,
        buttons:settings.getButtons(state, store, routeInfo, actions),
        fields:settings.getTableFields(state, store, routeInfo),
        multiSelectable:settings.multiSelectable,
        onRowSelection:(idArray) => {
          store.dispatch(actions.selected(idArray))
        }
      }
    }
  })
}

export default TableWidget