// the additional page elements present for each section
import React, { Component, PropTypes } from 'react'

import {
  ContainerWrapper
} from '../folder-ui/tools'

import pages from './config/pages'
import actions from './actions'
import selectors from './selectors'

import ConfirmDelete from '../folder-ui/components/ConfirmDelete'

const Statics = (store) => {

  return {

    installation: {
      
      table:[
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
          injectProps: (ownProps) => {
            const selectedIds = selectors.installation.selected(store.getState())
            return {
              onClose: () => store.dispatch(actions.installation.deleteWindow.close()),
              onConfirm: () => store.dispatch(actions.installation.delete.request({
                ids: selectedIds
              }))
            }
          }
        })
      ]
    }
  }
}

export default Pages