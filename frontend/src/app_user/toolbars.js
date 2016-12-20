import React, { Component, PropTypes } from 'react'

import {
  ContainerWrapper
} from '../folder-ui/tools'

import Toolbar from '../kettle-ui/Toolbar'

import actions from './actions'
import selectors from './selectors'
import pages from './config/pages'
import icons from './config/icons'

import * as buttonTools from '../folder-ui/buttons' 

const toolbar = ({ state, inject }) => {
  return ContainerWrapper(Toolbar, injector)
}

const route = (page = '', path = '') => pages[page].route + path
const routeAction = (page = '', path = '') => () => pages[page].route + path

const Buttons = (store) => {

  const tools = ButtonTools(store)

  return {

    installation: {

      table: (state) => {
        const selectedIds = state.selectedIds
        return []
          .concat(buttonTools.crud({
            selected: state.selected,
            routes: {
              add:route('installation', '/add'),
              edit:route('installation' '/edit')
            },
            deleteAction: () => actions.installation.confirmDelete.open(selectedIds)
          }))
          .concat(buttonTools.selection({
            selectAllAction: () => actions.installation.selection.select(selectedIds),
            selectNoneAction: () => actions.installation.selection.select([])
          }))
      }
    }
  }
}

const Toolbars = (store) => {

  const buttons = Buttons(store)
  
  return {

    installation: {

      table: toolbar({
        getState: selectors.installation.tableToolbar,
        injectProps: () => {
          const state = selectors.installation.tableToolbar(store.getState())
          const icon = (
            <icons.installation />
          )
          const buttons = buttons.installation.table(state)
          
          return {
            title:state.title,
            icon,
            leftbuttons:[
              tools.actionDropdown({
                title:'Actions',
                items:buttons.installation.table(state)
              })
            ]
          }
        }
      }),

      form: toolbar(() => {

      })

    }
  }
}

export default Toolbars