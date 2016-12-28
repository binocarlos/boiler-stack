// api imports
import deepCheck from 'deep-check-error'

import { takeLatest } from 'redux-saga'
import { fork, put, take } from 'redux-saga/effects'

import routerActions from '../../actions/router'
import ApiSaga from '../../sagas/api'
import ApiTriggerSaga from '../../sagas/apitrigger'
import FormSaga from '../../sagas/form'
import Schema from '../../utils/schema'

const REQUIRED_SETTINGS = [
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
      yield put(routerActions.push('/'))
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
      yield takeLatest([
        actions.login.api.types.success,
        actions.register.api.types.success
      ], triggerUserReloadThenRedirect)
    },

    triggerUserReload

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default UserSaga