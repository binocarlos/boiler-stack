// the actual content for each section
import React, { Component, PropTypes } from 'react'

import {
  ContainerWrapper
} from '../folder-ui/tools'

import actions from './actions'
import selectors from './selectors'

import tables from './config/tables'
import schemas from './config/schemas'
import Table from '../folder-ui/components/Table'

const Pages = (store) => {

  return {

    installation: {

      table: ContainerWrapper(Table, {

        // * items
        // * selected
        getState: (state) => {
          return {
            items: selectors.installation.items(state),
            selected: selectors.installation.items(selected)
          }
        },
        injectProps: (ownProps) => {
          const state = selectors.installation.tableToolbar(store.getState())
          const fields = tables.installation
          
          return {
            fields,
            onRowSelection:(ids) => console.log(ids)
          }
        }
      })
    }
  }
}

export default Pages