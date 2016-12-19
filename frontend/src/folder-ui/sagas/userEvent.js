import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'
import deepCheck from 'deep-check-error'

const REQUIRED_SETTINGS = [
  'trigger'
]

// deal with user events using the given config
const UserEventSaga = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const trigger = settings.trigger

  function* handleUserEvent(action) {
    yield put(status.request(true))
  }

  function* listener() {
    yield takeLatest(settings.trigger, handleUserEvent)
  }

  return listener
}

export default UserEventSaga