import Logger from '../logger'
import deepCheck from 'deep-check-error'
import { takeLatest } from 'redux-saga'
import { put, call } from 'redux-saga/effects'

const REQUIRED_SETTINGS = [
  'api',
  'actions.base',
  'actions.types.request',
  'actions.success',
  'actions.failure',
]

const ApiSagaFactory = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = settings.actions
  const api = settings.api
  const trigger = actions.types.request

  const logger = Logger('saga:api:' + actions.base)

  function* apiSaga(action) {
    logger('request', action)
    try {
      const result = yield api(action.payload, action.query)
      logger('response', result)
      yield put(actions.success(result, action.query))
    } catch (e) {
      logger('error', e.message)
      yield put(actions.failure(e.message, action.query))
    }
  }

  function* listen() {
    yield takeLatest(trigger, apiSaga)
  }

  return listen
}

export default ApiSagaFactory