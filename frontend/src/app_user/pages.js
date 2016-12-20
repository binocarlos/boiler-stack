// the actual content for each section
import React, { Component, PropTypes } from 'react'

import {
  ContainerWrapper
} from '../folder-ui/tools'

import actions from './actions'
import selectors from './selectors'

import tables from './tables'
import schemas from './schemas'

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
            selected: selectors.installation.selected(state)
          }
        },
        injectProps: (dispatch, ownProps) => {
          const fields = tables.installation(store)
          
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