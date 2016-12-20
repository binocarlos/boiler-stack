// the actual content for each section
import React, { Component, PropTypes } from 'react'

import {
  ContainerWrapper
} from '../../folder-ui/lib/tools'

import actions from '../actions'
import selectors from '../selectors'

import schemas from '../config/schemas'

import Form from '../../folder-ui/lib/components/Form'

const InstallationForm = (store) => {

  return ContainerWrapper(Form, {

    // * items
    // * selected
    getState: (state) => {
      return {
        items: selectors.installation.items(state),
        selected: selectors.installation.selected(state)
      }
    },
    injectProps: (dispatch, ownProps) => {
      const schema = schemas.installation(store)
      
      return {
        schema
      }
    }
  })

}

export default InstallationForm