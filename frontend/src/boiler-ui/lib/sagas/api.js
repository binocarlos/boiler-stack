import Logger from '../logger'
import deepCheck from 'deep-check-error'
import { takeLatest } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'

import SystemActions from '../actions/system'

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

  const logger = Logger('saga : api : ' + actions.base.toLowerCase())

  function* apiSaga(action) {
    logger('request', action)
    const state = yield select(state => state)

    // the api factory returns the actual runner
    // then it can look at the state to decide on the url
    const apiRunner = api(state)
    try {
      const result = yield apiRunner(action.query, action.payload)
      logger('response', result)
      yield put(actions.success(result, action.query))
    } catch (e) {
      logger('error', e.message, e.stack)

      let message = e.message

      if(e.response) {
        const body = e.response.data
        const statusCode = e.response.status

        message = body && body.error ?
          body.error :
          e.message

        let disableErrorMessage = settings.disableErrors ? true : false

        if(statusCode == 403) {
          disableErrorMessage = true
        }

        if(!disableErrorMessage) {
          yield put(SystemActions.error({message}))
        }
      }

      yield put(actions.failure(message, action.query))
    }
  }

  function* listen() {
    logger('listening: ' + trigger)
    yield takeLatest(trigger, apiSaga)
  }

  return listen
}

export default ApiSagaFactory