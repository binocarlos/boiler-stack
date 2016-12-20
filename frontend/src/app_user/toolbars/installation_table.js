import React, { Component, PropTypes } from 'react'

import {
  ContainerWrapper
} from '../../folder-ui/tools'

import Toolbar from '../../kettle-ui/Toolbar'
import * as buttonTools from '../../folder-ui/buttons'

import selectors from '../selectors'
import icons from '../config/icons'

const Buttons = (store) => (dispatch, ownProps) => {

  const selectedIds = selectors.installation.selected(store.getState())
  const allIds = selectors.installation.list(store.getState()).ids
  const items = []
    .concat(buttonTools.crud({
      selected: selectedIds,
      actions:{
        add: () => dispatch(actions.router.redirect(route('installation', '/add'))),
        edit: () => dispatch(actions.router.redirect(route('installation', '/edit/' + selectedIds[0]))),
        delete: () => dispatch(actions.installation.deleteWindow.open())  
      }
    }))
    .concat(buttonTools.divider())
    .concat(buttonTools.selection({
      actions:{
        selectAll: () => dispatch(actions.installation.table.select(allIds)),
        selectNone: () => dispatch(actions.installation.table.select([]))
      }
    }))

  return [
    buttonTools.actionDropdown({
      title:'Actions',
      items
    })
  ]

}

const InstallationTableToolbar = (store) => {

  const getButtons = Buttons(store)

  return ContainerWrapper(Toolbar, {

    // * title
    // * selectedIds
    // * selectedItems
    getState: (state) => {
      return {
        title: selectors.installation.selectedTitle(state),
        selectedIds: selectors.installation.items(state),
        selectedItems: selectors.installation.selectedItems(state)
      }
    },
    injectProps: (dispatch, ownProps) => {
      const icon = (
        <icons.installation />
      )
      return {
        icon,
        leftbuttons:getButtons(dispatch, ownProps)
      }
    }
  })

}

export default InstallationTableToolbar