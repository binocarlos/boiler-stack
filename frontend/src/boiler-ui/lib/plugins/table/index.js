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
  'getTableFields',
  'routes.add',
  'routes.edit',
  'apis.list',
  'apis.delete'
]

const TablePlugin = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = Actions(settings.name)
  const reducer = Reducer(actions)
  const selectors = Selectors(settings.selector)
  const saga = Saga({
    apis: settings.apis,
    actions
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

export default TablePlugin