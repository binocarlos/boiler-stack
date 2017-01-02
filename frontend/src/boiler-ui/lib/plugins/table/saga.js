import Logger from '../../logger'
import deepCheck from 'deep-check-error'

import { takeLatest } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

import ApiSaga from '../../sagas/api'

const REQUIRED_SETTINGS = [
  'actions.list',
  'apis.list'
]

const TablePluginSaga = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const getSchema = settings.getSchema
  
  const actions = settings.actions
  const apis = settings.apis

  const logger = Logger('saga:form')

  const sagas = [

    // GET /api/v1/installations
    ApiSaga({
      api: apis.list,
      actions: actions.list
    })

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default TablePluginSaga