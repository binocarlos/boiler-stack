import Tape from 'tape'
import SagaTester from 'redux-saga-tester'
import { put, call, take } from 'redux-saga/effects'

import ApiSaga from '../../../src/sagas/api'
import ApiReducer, { DEFAULT_STATE } from '../../../src/reducers/api'
import ApiActions from '../../../src/actions/api'

const tape = (name, handler) => Tape('unit -> config -> form -> text' + name, handler)

const getState = () => {
  return {}
}

const testSuite = (opts = {}) => {

  const actions = ApiActions('BASE')

  const getTester = ({ api }) => {
    const sagaTester = new SagaTester({
      DEFAULT_STATE,
      reducers: { test: ApiReducer(actions.types) }
    })
    sagaTester.start(ApiSaga({
      api,
      actions
    }))
    return sagaTester
  }

  tape('default state', t => {
    const api = (query, payload) => payload + ':' + query
    const tester = getTester(api)

    t.deepEqual(
      tester.getState().test,
      DEFAULT_STATE,
      'default state'
    )
    
    t.end()
  })


}

export default testSuite