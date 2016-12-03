import { takeLatest } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import api from './api'
import { getURL } from './settings'
import bows from 'bows'

const logger = bows('passport:sagas')

// triggers an initial user-load when the app starts
// the saga ends immediately
const InitialLoad = (settings = {}) => {

  function *initialLoad() {
    yield put({
      type:'USER_STATUS_REQUESTED'
    })
  }

  return initialLoad
}

const Status = (settings = {}) => {
  
  function *getUserStatus(action) {

    const statusURL = getURL(settings, 'status')
    logger('getUserStatus: ', statusURL)

    try {
      const user = yield call(api.fetchUser, getURL(settings, 'status'))
      yield put({type: 'USER_STATUS_SUCCEEDED', user: user})
    } catch (e) {
      yield put({type: 'USER_STATUS_FAILED', message: e.message})
    }
  }

  function* userStatus() {
    yield takeLatest('USER_STATUS_REQUESTED', getUserStatus)
  }

  return userStatus
}


const factory = (settings = {}) => {
  return function* passportSaga() {
    yield [
      fork(InitialLoad(settings)),
      fork(Status(settings))
    ]
  }

}

export default factory