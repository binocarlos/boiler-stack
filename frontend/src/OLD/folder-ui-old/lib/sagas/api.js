import bows from 'bows'
import deepCheck from 'deep-check-error'
import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'

const REQUIRED_SETTINGS = [
  'handler',
  'actions.types',
  'actions.request',
  'actions.success',
  'actions.failure',
]

const ApiSagaFactory = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = settings.actions
  const handler = settings.handler
  const trigger = actions.types.request
  
  const logger = bows('folderui:saga:api:' + trigger)

  function* apiRequest(action) {
    logger('request', action)
    try {
      const data = yield handler(action.query, action.data)
      logger('response', data)
      yield put(actions.success(data, action.query))
    } catch (e) {
      logger('error', e.message)
      yield put(actions.failure(e.message, action.query))
    }
  }

  function* listener() {
    yield takeLatest(trigger, apiRequest)
  }

  return listener
}

export default ApiSagaFactory