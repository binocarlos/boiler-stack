import bows from 'bows'
import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'

const ApiSagaFactory = (opts = {}) => {

  if(!opts.label) throw new Error('api saga factory needs label option')
  if(!opts.actions) throw new Error('api saga factory needs actions option')
  if(!opts.handler) throw new Error('api saga factory needs handler option')

  const logger = bows('folderui:saga:' + opts.label)

  logger('creating api saga: ' + opts.label, {
    opts
  })

  const handler = opts.handler
  const actions = opts.actions
  const injector = opts.injector
  const trigger = opts.trigger

  function* apiRequest(action) {
    logger('request', action)
    try {
      const data = yield handler(action.query, action.data)
      const injected = injector ?
        injector(data) :
        data
      logger('response', injected)
      yield put(actions.success(injected))
    } catch (e) {
      logger('error', e.message)
      yield put(actions.failure(e.message))
    }
  }

  function* apiSaga() {
    yield takeLatest(trigger, apiRequest)
  }

  return apiSaga
}

export default ApiSagaFactory