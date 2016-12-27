import Tape from 'tape'
import SagaTester from 'redux-saga-tester'
import { put, call, take } from 'redux-saga/effects'

import Schema from '../../../../src/boiler-ui/lib/utils/form/schema'

import FormSaga from '../../../../src/boiler-ui/lib/sagas/form'
import FormReducer, { DEFAULT_STATE } from '../../../../src/boiler-ui/lib/reducers/form'
import FormActions from '../../../../src/boiler-ui/lib/actions/form'

const tape = (name, handler) => Tape('unit -> config -> sagas -> form' + name, handler)

import {
  exampleField,
  exampleMeta
} from '../utils/form/tools'

const testSuite = (opts = {}) => {

  const actions = FormActions('BASE')
  const FIELDS = [
    exampleField()
  ]

  const getSchema = () => {
    return Schema(FIELDS)
  }
  
  const getTester = (fields = FIELDS, state = DEFAULT_STATE) => {
    const sagaTester = new SagaTester({
      state,
      reducers: { test: FormReducer(actions.types) }
    })
    sagaTester.start(FormSaga({
      getSchema,
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

  tape(' -> initialize', t => {
    const tester = getTester()
    const schema = getSchema()

    tester.dispatch(actions.initialize({}))

    // test that the initialize resulted in an inject
    t.deepEqual(
      tester.getActionsCalled(),
      [
        actions.initialize({}),
        actions.inject(schema.initialData(), schema.meta(schema.initialData()))
      ],
      'injected with initial values'
    )

    t.end()
  })

  tape(' -> load', t => {
    const tester = getTester()
    const schema = getSchema()
    const data = {b:10}

    tester.dispatch(actions.load(data))

    // test that the initialize resulted in an inject
    t.deepEqual(
      tester.getActionsCalled(),
      [
        actions.load(data),
        actions.inject(data, schema.meta(data))
      ],
      'injected with loaded values'
    )

    t.end()
  })

  tape(' -> touch', t => {
    const tester = getTester()
    const schema = getSchema()

    tester.dispatch(actions.initialize({}))
    tester.dispatch(actions.touch('fruit'))

    // test that the initialize resulted in an inject
    t.deepEqual(
      tester.getActionsCalled(),
      [
        actions.initialize({}),
        actions.inject(schema.initialData(), schema.meta(schema.initialData())),
        actions.touch('fruit')
      ],
      'injected with loaded values'
    )

    t.equal(tester.getState().test.meta.fields.testfield.touched, true, 'the field is touched')

    t.end()
  })



}

export default testSuite