import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'

const ApiSagaFactory = (opts = {}) => {

  if(!opts.actions) throw new Error('api saga factory needs actions option')
  if(!opts.handler) throw new Error('api saga factory needs handler option')

  const actions = opts.actions
  const handler = opts.handler
  const trigger = actions.types.REQUEST

  function* apiRequest(action) {
    try {
      const data = yield handler(action.query, action.data)
      yield put(actions.success(data))
    } catch (e) {
      yield put(actions.failure(e.message))
    }
  }

  function* apiSaga() {
    yield takeLatest(trigger, apiRequest)
  }

  return apiSaga
}

export default ApiSagaFactory