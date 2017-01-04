import Logger from '../logger'
import deepCheck from 'deep-check-error'
import { takeLatest } from 'redux-saga'
import { put, call, select } from 'redux-saga/effects'

// TODO: this should not be importing this
import UserSelectors from '../plugins/user/selectors'

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
  const userSelectors = UserSelectors(state => state.user)

  const logger = Logger('saga : api : ' + actions.base.toLowerCase())

  function* apiSaga(action) {
    logger('request', action)
    try {
      const currentInstallation = yield select(userSelectors.status.currentInstallation)
      // inject the currentInstallation into all api queries
      const query = Object.assign({}, action.query, {
        currentInstallation
      })
      const result = yield api(query, action.payload)
      logger('response', result)
      yield put(actions.success(result, action.query))
    } catch (e) {
      logger('error', e.message, e.stack)
      yield put(actions.failure(e.message, action.query))
    }
  }

  function* listen() {
    logger('listening: ' + trigger)
    yield takeLatest(trigger, apiSaga)
  }

  return listen
}

export default ApiSagaFactory