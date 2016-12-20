// the toolbars above the content in each section
import React, { Component, PropTypes } from 'react'

import {
  ContainerWrapper
} from '../folder-ui/tools'

import Toolbar from '../kettle-ui/Toolbar'

import selectors from './selectors'
import icons from './config/icons'

import Buttons from './toolbarButtons'

const toolbar = (opts = {}) => {
  return ContainerWrapper(Toolbar, opts)
}

const Toolbars = (store) => {

  const buttons = Buttons(store)

  return {

    installation: {

      table: toolbar({

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
          const buttons = buttons.installation.table(dispatch, ownProps)
          return {
            icon,
            leftbuttons:[
              tools.actionDropdown({
                title:'Actions',
                items:buttons
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