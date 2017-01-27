import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'

import Actions from './actions'
import Reducer from './reducer'
import Saga from './saga'
import Selectors from './selectors'
import Container from './Container'

const REQUIRED_SETTINGS = [
  'name',
  'apis',
  'selector',
  'title',
  'icon',
  // the schema describes the data structure for the saga
  'getSchema',
  // the form fields describes what to actually render for the form
  'getFormFields',
  'routes.success',
  'routes.cancel',
  'apis.get',
  'apis.put',
  'apis.post'
]

const FormPlugin = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = Actions(settings.name)
  const reducer = Reducer(actions)
  const selectors = Selectors(settings.selector)
  const saga = Saga({
    getSchema: settings.getSchema,
    apis: settings.apis,
    actions,
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
    reducer,
    saga,
    selectors,
    getContainer
  }
}

export default FormPlugin