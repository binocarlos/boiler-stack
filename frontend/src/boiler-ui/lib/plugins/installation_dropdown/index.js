import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'

import Actions from './actions'
import Saga from './saga'
import Container from './Container'

const REQUIRED_SETTINGS = [
  'base',
  'userActions',
  'selectors.userdata',
  'selectors.installations'
]

const InstallationDropdownPlugin = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = Actions(settings.base)
  const userActions = settings.userActions
  const selectors = settings.selectors
  const saga = Saga({
    actions,
    userActions,
    selectors
  })

  const getContainer = () => {
    const containerProps = Object.assign({}, settings, {
      selectors,
      actions
    })
    return (
      <Container {...containerProps} />
    )
  }

  return {
    actions,
    saga,
    selectors,
    getContainer
  }
}

export default InstallationDropdownPlugin