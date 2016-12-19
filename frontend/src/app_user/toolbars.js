import React, { Component, PropTypes } from 'react'

import {
  ComponentInjector
} from '../folder-ui/tools'

import Toolbar from '../kettle-ui/Toolbar'

import actions from './actions'
import selectors from './selectors'
import pages from './config/pages'

import Buttons from './buttons'

const toolbar = (injector) => {
  return ComponentInjector(Toolbar, injector)
}

const toolbars = (store) => {

  const buttons = Buttons(store)

  return {
    installation:{
      table:toolbar(() => {
        const state = selectors.installation.table(store.getState())
        
        return {
          title:
        }
      }),
      form:ComponentInjector(Toolbar, () => {

      })

      () => {
        const state = selectors.installation.table(store.getState())
        const selected = state.selected

        const items = []
          .concat(crudButtons({
            selected:state.selected,
            routes:{
              add:routes.installation('/add'),
              edit:routes.installation('/edit')
            },
            deleteAction:actions.installation.confirmDelete.open
          }))
          .concat(selectButtons({
            ids:selected,
            selectAction:actions.installation.selection.select
          }))

        return [
          actionDropdown(items)
        ]
      },
      form:(state) => {

      }
    }
  }
}

export default buttons