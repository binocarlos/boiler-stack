import React, { Component, PropTypes } from 'react'

import {
  ContainerWrapper
} from '../../folder-ui/lib/tools'

import Toolbar from '../../kettle-ui/lib/Toolbar'
import * as buttonTools from '../../folder-ui/lib/buttons'

import selectors from '../selectors'
import icons from '../config/icons'

const Buttons = (store) => (dispatch, ownProps) => {

  return []
    .concat(buttonTools.form({
      actions:{
        cancel: () => dispatch(actions.router.redirect(route('installation'))),
        revert: () => dispatch(actions.installation.form.revert()),
        save: () => dispatch(actions.installation.deleteWindow.open())  
      }
    }))

}

const InstallationFormToolbar = (store) => {

  const getButtons = Buttons(store)

  return {

    table: ContainerWrapper(Toolbar, {

      getState: (state) => {
        return {
          title: 'Form Toolbar'
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
}

export default InstallationFormToolbar