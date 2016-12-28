import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'
import deepCheck from 'deep-check-error'

const REQUIRED_SETTINGS = [
  'trigger',
  'selectors.user',
  'actions.saveUser',
]

const SwitchInstallationSaga = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const actions = settings.actions
  const selectors = settings.selectors
  const trigger = settings.trigger

  function* switchInstallation(action) {
    const user = yield select(selectors.user)
    const data = Object.assign({}, user.data)
    data.currentInstallation = action.id
    yield put(actions.saveUser({
      id:action.id,
      message:settings.message
    }, {
      data
    }))
  }

  function* listener() {
    yield takeLatest(settings.trigger, switchInstallation)
  }

  return listener
}

export default SwitchInstallationSaga