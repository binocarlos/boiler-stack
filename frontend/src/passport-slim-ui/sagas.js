import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import bows from 'bows'
bows.config({
  padLength:64
})
import api from './api'
import * as actions from './actions'
import { 
  isUserLoaded,
  isUserLoggedIn,
  getUser,
  getRouteAssertion,
  hasRouteAssertion
} 
from './selectors'
import { checkAssertion } from './auth'

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

// triggers an initial user-load when the app starts
// the saga ends immediately
const Logout = (opts = {}) => {
  if(!opts.path) throw new Error('Logout saga needs path')
  function* doLogout(action) {
    document.location = opts.path
  }

  function* logoutSaga() {
    yield takeLatest(actions.PASSPORT_LOGOUT, doLogout)
  }

  return logoutSaga
}

// listen for once the user has registered/logged in
//  * reload the user stats
//  * re-direct the app
const PostSubmit = (trigger) => {

  const logger = bows('passport:PostSubmit:' + trigger)

  function* postSubmitHandler(action) {
    logger('handler', action)

    logger('clearing route assertion')
    yield put(actions.clearRouteAssertion())

    // send the user data into the status reducer
    logger('updating user status')
    yield put(actions.status.update({
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


//  * PASSPORT_MAKE_ROUTE_ASSERTION -> check if user is loaded
//    * if yes do assertion + PASSPORT_CLEAR_ROUTE_ASSERTION
//  * PASSPORT_STATUS.SUCCESS -> check if there is an assertion
//    * if yes do assertion + PASSPORT_CLEAR_ROUTE_ASSERTION
const RouteAssertion = () => {

  // this is where if there is a route assertion - we do it
  function* applyRouteAssertion() {
    const hasAssertion = yield select(hasRouteAssertion)
    const userLoaded = yield select(isUserLoaded)
    if(!hasAssertion || !userLoaded) return

    const userData = yield select(getUser)
    const assertion = yield select(getRouteAssertion)

    if(!checkAssertion(assertion.rule, userData)){
      yield put(push(assertion.failureRedirect))
    }

    yield put(actions.clearRouteAssertion())
  }

  function* checkRouteAssertion() {
    const userLoaded = yield select(isUserLoaded)

    if(userLoaded){
      yield call(applyRouteAssertion)
    }
  }

  function* waitForRouteAssertion() {
    yield takeLatest(actions.PASSPORT_MAKE_ROUTE_ASSERTION, checkRouteAssertion)
  }

  function* waitForStatusUpdate() {
    yield takeLatest(actions.PASSPORT_STATUS.SUCCESS, applyRouteAssertion)
  }

  function* routeAssertionSaga() {
    yield [
      fork(waitForRouteAssertion),
      fork(waitForStatusUpdate)
    ]
  }

  return routeAssertionSaga
}

const factory = (settings = {}) => {
  return function* passportSaga() {
    yield [
      fork(InitialUserLoad()),
      fork(Logout({
        path:settings.fullLogoutPath
      })),
      fork(PostSubmit(actions.PASSPORT_LOGIN.SUCCESS)),
      fork(PostSubmit(actions.PASSPORT_REGISTER.SUCCESS)),
      fork(Status(settings)),
      fork(Login(settings)),
      fork(Register(settings)),
      fork(RouteAssertion())
    ]
  }
}

export default factory