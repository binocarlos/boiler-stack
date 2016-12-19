import React, { Component, PropTypes } from 'react'

import actions from './actions'
import selectors from './selectors'
import pages from './config/pages'

import Tools from './tools/buttons'

const routes = {
  installation:(path = '') => pages.installation.route + path
}

const buttons = (store) => {

  const tools = Tools(store)
  
  return {
    installation:{
      table:() => {
        const state = selectors.installation.table(store.getState())
        const selected = state.selected

        const items = []
          .concat(tools.crudButtons({
            selected:state.selected,
            routes:{
              add:routes.installation('/add'),
              edit:routes.installation('/edit')
            },
            deleteAction:actions.installation.confirmDelete.open
          }))
          .concat(tools.selectButtons({
            ids:selected,
            selectAction:actions.installation.selection.select
          }))

        return [
          tools.actionDropdown(items)
        ]
      },
      form:(state) => {
        return []
      }
    }
  }
}

export default buttons