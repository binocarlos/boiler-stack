import Logger from '../../logger'
import deepCheck from 'deep-check-error'

import { takeLatest } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

import ApiSaga from '../../sagas/api'

const REQUIRED_SETTINGS = [
  'actions',
  'api'
]

const CrudTableSaga = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = settings.actions
  const api = settings.api
  const logger = Logger('saga:crudtable:' + actions.base)

  const sagas = [

    ApiSaga({
      api: api,
      actions: actions.list
    })

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default CrudTableSaga