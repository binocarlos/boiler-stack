import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'
import deepCheck from 'deep-check-error'

import {
  status
} from '../../../passport-slim-ui/lib/actions'

const REQUIRED_SETTINGS = [
  'trigger'
]

const RefreshUserSaga = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const trigger = settings.trigger

  function* refreshUser(action) {
    yield put(status.request(true))
  }

  function* listener() {
    yield takeLatest(settings.trigger, refreshUser)
  }

  return listener
}

export default RefreshUserSaga