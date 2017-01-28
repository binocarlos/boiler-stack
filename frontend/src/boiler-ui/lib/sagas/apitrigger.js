/*

  a trigger saga that listens for the submit action of a form



*/
import deepCheck from 'deep-check-error'
import { takeLatest } from 'redux-saga'
import { put, call, fork, select  } from 'redux-saga/effects'

const REQUIRED_SETTINGS = [
  'trigger',
  'handler',
  'selectors.payload',
  'selectors.query'
]

const ApiTriggerSagaFactory = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const trigger = settings.trigger
  const actionCreator = settings.handler
  const selectors = settings.selectors
  
  function* triggerApi(action) {
    const payload = yield select(selectors.payload)
    const query = yield select(selectors.query)
    yield put(actionCreator(query, payload))
  }

  function* root() {
    yield takeLatest(trigger, triggerApi)
  }

  return root
}

export default ApiTriggerSagaFactory