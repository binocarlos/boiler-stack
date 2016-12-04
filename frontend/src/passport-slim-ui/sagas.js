import { takeLatest } from 'redux-saga'
import { fork, put, call, take } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import bows from 'bows'
bows.config({
  padLength:64
})
import api from './api'
import * as actions from './actions'


const mainlogger = bows('passport:saga')

const getURL = (settings, name) => {
  return settings.passportURL + settings[name + 'Path']
}

const ApiSagaFactory = (opts = {}) => {

  const logger = bows('passport:saga:' + opts.name)
  const sagaActions = opts.actions
  const apiHandler = opts.apiHandler

  function* apiRequest(action) {

    // allow data to refresh without triggering the 'loading' or 'loaded' flags
    if(!action.noloading){
      logger('loading')
      yield put(sagaActions.loading())
    }

    try {
      logger('request')
      const data = yield apiHandler(action.data)
      logger('response: ', data)
      yield put(sagaActions.success(data))
    } catch (e) {
      logger('error: ', e.message)
      yield put(sagaActions.failure(e.message))
    }
  }

  function* apiSaga() {
    yield takeLatest(opts.trigger, apiRequest)
  }

  return apiSaga
}

const Status = (settings = {}) => {
  const url = getURL(settings, 'status')
  mainlogger('creating status saga: ' + url)
  return ApiSagaFactory({
    name:'status',
    trigger:actions.PASSPORT_STATUS.REQUEST,
    actions:actions.status,
    apiHandler:() => {
      return call(api.status, url)
    }
  })
}

const Login = (settings = {}) => {
  const url = getURL(settings, 'login')
  mainlogger('creating login saga: ' + url)
  return ApiSagaFactory({
    name:'login',
    trigger:actions.PASSPORT_LOGIN.REQUEST,
    actions:actions.login,
    apiHandler:(data) => {
      return call(api.login, url, data)
    }
  })
}

const Register = (settings = {}) => {
  const url = getURL(settings, 'register')
  mainlogger('creating register saga: ' + url)
  return ApiSagaFactory({
    name:'register',
    trigger:actions.PASSPORT_REGISTER.REQUEST,
    actions:actions.register,
    apiHandler:(data) => {
      return call(api.register, url, data)
    }
  })
}

// triggers an initial user-load when the app starts
// the saga ends immediately
const InitialUserLoad = () => {
  function *initialUserLoad() {
    yield put(actions.status.request())
  }
  return initialUserLoad
}

// listen for once the user has registered/logged in
//  * reload the user stats
//  * re-direct the app
const PostSubmit = (trigger) => {

  const logger = bows('passport:PostSubmit:' + trigger)

  function* postSubmitHandler(action) {
    logger('handler', action)

    // send the user data into the status reducer
    logger('updating user status')
    yield put(actions.status.success({
      loggedIn:true,
      data:action.data.data
    }))

    logger('redirecting')
    yield put(push('/'))
  }

  function* apiSaga() {
    yield takeLatest(trigger, postSubmitHandler)
  }

  return apiSaga
}

const factory = (settings = {}) => {
  return function* passportSaga() {
    yield [
      fork(InitialUserLoad()),
      fork(PostSubmit(actions.PASSPORT_LOGIN.SUCCESS)),
      fork(PostSubmit(actions.PASSPORT_REGISTER.SUCCESS)),
      fork(Status(settings)),
      fork(Login(settings)),
      fork(Register(settings))
    ]
  }
}

export default factory