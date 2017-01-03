import Logger from '../../logger'
import deepCheck from 'deep-check-error'

import { takeLatest } from 'redux-saga'
import { fork, put, take, select } from 'redux-saga/effects'

import routerActions from '../../actions/router'
import ApiSaga from '../../sagas/api'
import FormSaga from '../../sagas/form'
import Schema from '../../utils/schema'

const REQUIRED_SETTINGS = [
  'getSchema',
  'actions',
  'selectors',
  'apis.get',
  'apis.put',
  'apis.post'
]

const FormPluginSaga = (settings = {}) => {
  deepCheck(settings, REQUIRED_SETTINGS)

  const getSchema = settings.getSchema
  
  const actions = settings.actions
  const selectors = settings.selectors
  const apis = settings.apis
  const successRedirect = settings.successRedirect
  const logger = Logger('saga:form')

  const sagas = [

    FormSaga({
      getSchema: () => Schema(getSchema()),
      selector: selectors.fields,
      actions: actions.fields
    }),

    // GET /api/v1/installations/:id
    ApiSaga({
      api: apis.get,
      actions: actions.get
    }),

    // POST /api/v1/installations
    ApiSaga({
      api: apis.post,
      actions: actions.post
    }),

    // PUT /api/v1/installations/:id
    ApiSaga({
      api: apis.put,
      actions: actions.put
    }),

    // for the edit form - trigger a form.load action
    // once the data is loaded
    function* listenForLoadedData() {
      function* triggerLoad(action) {
        yield put(actions.fields.load(action.payload))
      }
      logger('listening: ' + actions.get.types.success)
      yield takeLatest(actions.get.types.success, triggerLoad)
    },

    function* listenForSubmit() {
      const trigger = actions.fields.types.submit
      function* submitForm(action) {
        const successRedirect = action.payload
        const routerState = yield select(state => state.router)
        const payload = yield select(state => selectors.fields(state).data)

        // check if we are doing a put or post
        const page = routerState.result
        const query = routerState.params

        if(!page.api || !actions[page.api]){
          throw new Error('router result needs api property')
        }
      
        // the put or post actions
        const apiActions = actions[page.api]
        yield put(apiActions.request(payload, query))

        // wait for the error/success response
        const responseAction = yield take([
          apiActions.types.failure,
          apiActions.types.success
        ])

        if(responseAction.type === apiActions.types.success) {
          yield put(routerActions.push(successRedirect))
        }
      }
      logger('listening: ' + trigger)
      yield takeLatest(trigger, submitForm)
    }

  ]

  function* root() {
    yield sagas.map(fork)
  }

  return root
}

export default FormPluginSaga