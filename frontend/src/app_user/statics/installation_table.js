// the additional page elements present for each section
import React, { Component, PropTypes } from 'react'

import {
  ContainerWrapper
} from '../../folder-ui/tools'

import pages from '../config/pages'
import actions from '../actions'
import selectors from '../selectors'

import ConfirmDelete from '../../folder-ui/components/ConfirmDelete'

const InstallationTableStatics = (store) => {

  return [
    ContainerWrapper(ConfirmDelete, {

      // * title
      // * pluralTitle
      // * open
      // * count
      getState: (state) => {
        return {
          title: pages.installation.title, 
          pluralTitle: pages.installation.pluralTitle,
          open: selectors.installation.currentlyDeleting(state),
          count: selectors.installation.selected(state).length
        }
      },
      injectProps: (dispatch, ownProps) => {
        const selectedIds = selectors.installation.selected(store.getState())
        return {
          onClose: () => dispatch(actions.installation.deleteWindow.close()),
          onConfirm: () => dispatch(actions.installation.deleteWindow.confirm())
        }
      }
    })
  ]
}

export default InstallationTableStatics