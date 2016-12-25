import Tape from 'tape'
import SagaTester from 'redux-saga-tester'
import { put, call, take } from 'redux-saga/effects'

import ApiSaga from '../../../src/sagas/api'
import ApiReducer, { DEFAULT_STATE } from '../../../src/reducers/api'
import ApiActions from '../../../src/actions/api'

const tape = (name, handler) => Tape('unit -> config -> sagas -> api' + name, handler)

const getState = () => {
  return {}
}

const testSuite = (opts = {}) => {

  const actions = ApiActions('BASE')

  const getTester = (api) => {
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

  tape(' -> constructor', t => {
    const PAYLOAD = 10
    const QUERY = 5
    const tester = getTester((payload, query) => {
      t.equal(payload, PAYLOAD, 'payload equal')
      t.equal(query, QUERY, 'query equal')
      return null
    })

    t.deepEqual(
      tester.getState().test,
      DEFAULT_STATE,
      'default state'
    )

    tester.dispatch(actions.request(PAYLOAD, QUERY))

    t.end()
  })

  tape(' -> success', t => {
    const tester = getTester(() => null)

    tester.dispatch(actions.request())

    t.deepEqual(
      tester.getState().test,
      {
        loading: false,
        loaded: true,
        query: null,
        error: null
      },
      'success state'
    )

    t.deepEqual(
      tester.getActionsCalled(),
      [
        actions.request(),
        actions.success()
      ],
      'success actions'
    )

    t.end()
  })

  tape(' -> fail', t => {
    const tester = getTester(() => {
      throw new Error('apples error')
    })

    tester.dispatch(actions.request())

    t.deepEqual(
      tester.getState().test,
      {
        loading: false,
        loaded: true,
        query: null,
        error: 'apples error'
      },
      'error state'
    )

    t.deepEqual(
      tester.getActionsCalled(),
      [
        actions.request(),
        actions.failure('apples error')
      ],
      'success actions'
    )

    t.end()
  })

}

export default testSuite