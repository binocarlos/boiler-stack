import Logger from '../../logger'
import deepCheck from 'deep-check-error'

import { takeLatest } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

import ApiSaga from '../../sagas/api'
import ApiTriggerSaga from '../../sagas/apitrigger'
import FormSaga from '../../sagas/form'
import Schema from '../../utils/schema'

const REQUIRED_SETTINGS = [
  'getSchema',
  'actions',
  'selector',
  'apis.get',
  'apis.put',
  'apis.post'
]

const FormPluginSaga = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const getSchema = settings.getSchema
  
  const actions = settings.actions
  const selector = settings.selector
  const apis = settings.apis

  const logger = Logger('saga:form')

  const sagas = [

    FormSaga({
      getSchema: () => Schema(getSchema()),
      selector: selector,
      actions: actions.fields
    }),

    // GET /api/v1/installations/:id
    ApiSaga({
      api: apis.get,
      actions: actions.get
    }),

    // POST /api/v1/installations
    ApiSaga({
      api: apis.post,
      actions: actions.post
    }),

    // PUT /api/v1/installations/:id
    ApiSaga({
      api: apis.put,
      actions: actions.put
    })

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default FormPluginSaga