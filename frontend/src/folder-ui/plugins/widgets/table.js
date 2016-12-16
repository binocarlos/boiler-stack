import React, { Component, PropTypes } from 'react'

import { ContainerWrapper } from '../../tools'
import { virtualTable } from '../../reducers/selectors'

import ToolbarContent from '../../containers/ToolbarContent'
import Table from '../../components/Table'

const REQUIRED_SETTINGS = [
  'actions',
  'selector',
  'getTitle',
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

  const mapRouteInfo = (routeInfo) => {
    return settings.mapRouteInfo ?
      settings.mapRouteInfo(routeInfo) :
      routeInfo
  }

  return (store) => {

    const getState = (routeInfo) => {
      routeInfo = mapRouteInfo(routeInfo)
      const state = settings.selector(store.getState())
      const selected = state.list.selected
      const data = state.get.data || {}
      const table = virtualTable(data.ids, data.db)
      return {
        title:settings.getTitle(state, routeInfo),
        data:table.getItems(),
        selected,
        selectedItems:table.getSelectedItems(selected)
      }
    }

    return ContainerWrapper(ToolbarContent, {
      ContentComponent:Table,
      ToolbarComponent:settings.ToolbarComponent,
      initializeData:(routeInfo) => {
        routeInfo = mapRouteInfo(routeInfo)
        store.dispatch(actions.requestInitialData())
      },
      getState:getState,
      getInjectedProps:(routeInfo) => {
        routeInfo = mapRouteInfo(routeInfo)
        const state = getState(routeInfo)
        return {
          getIcon:settings.getIcon,
          buttons:settings.getButtons(state, store, routeInfo),
          fields:settings.getTableFields(state, store, routeInfo),
          multiSelectable:settings.multiSelectable,
          onRowSelection:(idArray) => store.dispatch(actions.selected(idArray))
        }
      }
    })
  }
}

export default TableWidget