import bows from 'bows'
import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'

const ApiSagaFactory = (opts = {}) => {

  if(!opts.name) throw new Error('api saga factory needs name option')
  if(!opts.actions) throw new Error('api saga factory needs actions option')
  if(!opts.handler) throw new Error('api saga factory needs handler option')

  const logger = bows('folderui:saga:' + opts.name)

  logger('creating api saga', {
    opts,
    actions
  })

  const actions = opts.actions
  const handler = opts.handler
  const injector = opts.injector
  const trigger = actions.types.REQUEST

  function* apiRequest(action) {
    logger('request', action)
    try {
      const data = yield handler(action.query, action.data)
      const injected = injector ?
        injector(data) :
        data
      logger('response', data)
      logger('injecteed', injected)
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