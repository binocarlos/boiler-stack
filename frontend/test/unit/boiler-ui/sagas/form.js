import Tape from 'tape'
import async from 'async'
import SagaTester from 'redux-saga-tester'
import { put, call, take } from 'redux-saga/effects'

import Schema from '../../../../src/boiler-ui/lib/utils/schema'

import FormSaga from '../../../../src/boiler-ui/lib/sagas/form'
import FormReducer, { DEFAULT_STATE } from '../../../../src/boiler-ui/lib/reducers/form'
import FormActions from '../../../../src/boiler-ui/lib/actions/form'

const tape = (name, handler) => Tape('unit -> config -> sagas -> form' + name, handler)

import {
  exampleField,
  exampleMeta
} from '../utils/schema/tools'

const testSuite = (opts = {}) => {

  const actions = FormActions('BASE')
  const FIELDS = [
    exampleField()
  ]

  const getSchema = () => {
    return Schema(FIELDS)
  }

  const baseActions = (schema) => {
    return [
      actions.initialize({}),
      actions.inject(schema.initialData(), schema.meta(schema.initialData()))
    ]
  }
  
  const getTester = (fields = FIELDS, state = DEFAULT_STATE) => {
    const sagaTester = new SagaTester({
      state,
      reducers: { test: FormReducer(actions.types) }
    })
    sagaTester.start(FormSaga({
      getSchema,
      selector: (state) => state.test,
      actions
    }))
    return sagaTester
  }

  tape(' -> constructor', t => {
    const tester = getTester()
    const schema = getSchema()
    const reducer = FormReducer(actions.types)

    const actualState = tester.getState().test
    const expectedState = reducer(undefined, actions.inject(schema.initialData(), schema.meta(schema.initialData())))

    t.deepEqual(
      actualState,
      expectedState,
      'default state'
    )

    t.end()
  })

  tape(' -> initialize', t => {
    const tester = getTester()
    const schema = getSchema()

    tester.dispatch(actions.initialize({}))

    t.deepEqual(
      tester.getActionsCalled(),
      baseActions(schema).concat(baseActions(schema)),
      'injected with initial values'
    )

    t.end()
  })

  tape(' -> load', t => {
    const tester = getTester()
    const schema = getSchema()
    const data = {b:10}

    tester.dispatch(actions.load(data))

    t.deepEqual(
      tester.getActionsCalled(),
      baseActions(schema).concat([
        actions.load(data),
        actions.inject(data, schema.meta(data))
      ]),
      'injected with loaded values'
    )

    t.end()
  })

  // after the initialize - the field will have an error
  // to check we are not mutating references to meta data
  // we check that the original action is the same
  // after an update
  // there was a case where the initialize action was changing
  // when the update was called (because presumably the schema was mutating objects)
  // this test ensures this does not happen
  tape(' -> update', t => {
    const tester = getTester()
    const schema = getSchema()

    t.deepEqual(
      tester.getActionsCalled(),
      baseActions(schema),
      'initialize sequence correct'
    )
    
    tester.dispatch(actions.update('testfield', 'oranges'))

    const updateActions = [
      actions.update('testfield', 'oranges'),
      actions.updated({fruit:'oranges'}, schema.meta({fruit:'oranges'}))
    ]

    t.deepEqual(
      tester.getActionsCalled(),
      baseActions(schema).concat(updateActions),
      'update action sequence'
    )

    t.end()

  })

  tape(' -> touch', t => {
    const tester = getTester()
    const schema = getSchema()

    tester.dispatch(actions.touch('testfield'))

    t.deepEqual(
      tester.getActionsCalled(),
      baseActions(schema).concat([
        actions.touch('testfield'),
        actions.updated(schema.initialData(), schema.touch('testfield', schema.meta(schema.initialData())))
      ]),
      'touched action sequence'
    )

    t.equal(tester.getState().test.meta.fields.testfield.touched, true, 'the field is touched')

    t.end()
  })

  tape(' -> touchform', t => {
    const tester = getTester()
    const schema = getSchema()

    tester.dispatch(actions.touchform())

    t.deepEqual(
      tester.getActionsCalled(),
      baseActions(schema).concat([
        actions.touchform(),
        actions.updated(schema.initialData(), schema.touchForm(schema.meta(schema.initialData())))
      ]),
      'touchform action sequence'
    )

    t.equal(tester.getState().test.meta.form_touched, true, 'the form is touched')

    t.end()
  })


}

export default testSuite