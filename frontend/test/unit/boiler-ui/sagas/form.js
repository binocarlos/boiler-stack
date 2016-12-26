import Tape from 'tape'
import SagaTester from 'redux-saga-tester'
import { put, call, take } from 'redux-saga/effects'

import FormSaga from '../../../../src/boiler-ui/lib/sagas/form'
import FormReducer, { DEFAULT_STATE } from '../../../../src/boiler-ui/lib/reducers/form'
import FormActions from '../../../../src/boiler-ui/lib/actions/form'

const tape = (name, handler) => Tape('unit -> config -> sagas -> form' + name, handler)

const testSuite = (opts = {}) => {

  const actions = FormActions('BASE')

  const getTester = (schema = []) => {
    const sagaTester = new SagaTester({
      DEFAULT_STATE,
      reducers: { test: FormReducer(actions.types) }
    })
    sagaTester.start(FormSaga({
      schema,
      actions
    }))
    return sagaTester
  }

  tape(' -> constructor', t => {
    const tester = getTester()

    t.deepEqual(
      tester.getState().test,
      DEFAULT_STATE,
      'default state'
    )

    t.end()
  })

  tape(' -> empty schema initialize', t => {
    const tester = getTester()

    tester.dispatch(actions.initialize({}))

    // test that the initialize resulted in an inject
    t.deepEqual(
      tester.getActionsCalled(),
      [
        actions.initialize({}),
        actions.inject({}, {})
      ],
      'initialize -> inject'
    )

    t.end()
  })

}

export default testSuite