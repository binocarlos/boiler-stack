import Logger from '../../logger'
import deepCheck from 'deep-check-error'

import { takeLatest } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

import routerActions from '../../actions/router'
import ApiSaga from '../../sagas/api'
import ApiTriggerSaga from '../../sagas/apitrigger'
import FormSaga from '../../sagas/form'
import Schema from '../../utils/schema'

const REQUIRED_SETTINGS = [
  'successRedirect',
  'getLoginSchema',
  'getRegisterSchema',
  'actions',
  'selectors',
  'apis'
]

const UserSaga = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const getLoginSchema = settings.getLoginSchema
  const getRegisterSchema = settings.getRegisterSchema
  const actions = settings.actions
  const selectors = settings.selectors
  const apis = settings.apis
  const successRedirect = settings.successRedirect
  const logger = Logger('saga:user')

  function* triggerUserReload() {
    yield put(actions.status.api.request())
  }

  function* triggerUserReloadThenRedirect() {
    yield put(actions.status.api.request())
    const resultAction = yield take([
      actions.status.api.types.success,
      actions.status.api.types.failure
    ])

    // if it was a success - then do the redirect
    if(resultAction.type == actions.status.api.types.success) {
      yield put(routerActions.push(successRedirect))
    }
  }

  function* checkCurrentRoute(action) {
    const routerState = yield select(state => state.router)
    const loggedIn = yield select(selectors.status.loggedIn)

    const page = routerState.result || {}

    if(page.requireUser && !loggedIn){
      yield put(routerActions.push(page.requireUser))
    }
    else if(page.requireGuest && loggedIn){
      yield put(routerActions.push(page.requireGuest))
    }
  }

  const sagas = [

    // login form
    FormSaga({
      getSchema: () => Schema(getLoginSchema()),
      selector: selectors.login.form,
      actions: actions.login.form
    }),

    // register form
    FormSaga({
      getSchema: () => Schema(getRegisterSchema()),
      selector: selectors.register.form,
      actions: actions.register.form
    }),

    // GET /auth/v1/status
    ApiSaga({
      api: apis.status.get,
      actions: actions.status.api
    }),

    // POST /auth/v1/login
    ApiSaga({
      api: apis.login.post,
      actions: actions.login.api
    }),

    // POST /auth/v1/register
    ApiSaga({
      api: apis.register.post,
      actions: actions.register.api
    }),

    // submit login form
    ApiTriggerSaga({
      trigger: actions.login.form.types.submit,
      handler: actions.login.api.request,
      selectors: {
        payload: selectors.login.formdata,
        query: (state) => null
      }
    }),

    // submit register form
    ApiTriggerSaga({
      trigger: actions.register.form.types.submit,
      handler: actions.register.api.request,
      selectors: {
        payload: selectors.register.formdata,
        query: (state) => null
      }
    }),

    // listen for a successful login/register and refresh the user status
    function* triggerRefresh() {
      const types = [
        actions.login.api.types.success,
        actions.register.api.types.success
      ]
      types.forEach(type => logger('listening: ' + type))
      yield takeLatest(types, triggerUserReloadThenRedirect)
    },

    // listen for either route changes or user status refreshes
    // and check the user has access to the current route
    // this is controlled by the info passed to the redux-little-router
    // reducer by the routeinfo
    function* checkRouteAccess() {
      const types = [
        actions.status.api.types.success,
        routerActions.types.changed
      ]
      types.forEach(type => logger('listening: ' + type))
      yield takeLatest(types, checkCurrentRoute)
    },

    triggerUserReload

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default UserSaga