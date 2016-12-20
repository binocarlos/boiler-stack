// the actual content for each section
import React, { Component, PropTypes } from 'react'

import {
  ContainerWrapper
} from '../../folder-ui/lib/tools'

import actions from '../actions'
import selectors from '../selectors'

import tables from '../config/tables'

import Table from '../../folder-ui/lib/components/Table'

const InstallationTable = (store) => {

  return ContainerWrapper(Table, {

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

export default InstallationTable