import Tape from 'tape'
import async from 'async'
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
      selector: (state) => state.test,
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

  // after the initialize - the field will have an error
  // to check we are not mutating references to meta data
  // we check that the original action is the same
  // after an update
  // there was a case where the initialize action was changing
  // when the update was called (because presumably the schema was mutating objects)
  // this test ensures this does not happen
  tape(' -> update keeps meta immutable', t => {
    const tester = getTester()
    const schema = getSchema()

    const baseActions = [
      actions.initialize({}),
      actions.inject(schema.initialData(), schema.meta(schema.initialData()))
    ]

    tester.dispatch(actions.initialize({}))

    t.deepEqual(
      tester.getActionsCalled(),
      baseActions,
      'initialize sequence correct'
    )
    
    tester.dispatch(actions.update('testfield', 'oranges'))

    const updateActions = [
      actions.update('testfield', 'oranges'),
      actions.inject({fruit:'oranges'}, schema.meta({fruit:'oranges'}))
    ]

    t.deepEqual(
      tester.getActionsCalled(),
      baseActions.concat(updateActions),
      'update action sequence'
    )

    t.end()


/*
    tester.dispatch(actions.initialize({}))

    await tester.waitFor(actions.types.inject)

    tester.dispatch(actions.update('testfield', 'oranges'))

    console.log(JSON.stringify(tester.getActionsCalled(), null, 4))
    t.deepEqual(
      tester.getActionsCalled(),
      [
        actions.initialize({}),
        actions.inject(schema.initialData(), schema.meta(schema.initialData())),
        actions.update('testfield', 'oranges'),
        actions.inject({fruit:'oranges'}, schema.meta({fruit:'oranges'}))
      ],
      'update action sequence'
    )

    t.equal(tester.getState().test.data.fruit, 'oranges', 'the field is updated')

    t.end()
*/

  })



/*
  tape(' -> update + touch', t => {
    const tester = getTester()
    const schema = getSchema()

    tester.dispatch(actions.initialize({}))
    tester.dispatch(actions.update('testfield', 'oranges'))
    tester.dispatch(actions.touch('testfield'))

    t.deepEqual(
      tester.getActionsCalled(),
      [
        actions.initialize({}),
        actions.inject(schema.initialData(), schema.meta(schema.initialData())),
        actions.update('testfield', 'oranges'),
        actions.inject({fruit:'oranges'}, schema.meta({fruit:'oranges'})),
        actions.touch('testfield'),
        actions.inject(schema.initialData(), schema.touch('testfield', schema.meta(schema.initialData())))
      ],
      'touched action sequence'
    )

    t.equal(tester.getState().test.meta.fields.testfield.touched, true, 'the field is touched')

    t.end()
  })

  tape(' -> no update + touch', t => {
    const tester = getTester()
    const schema = getSchema()

    tester.dispatch(actions.initialize({}))
    tester.dispatch(actions.touch('testfield'))

    t.deepEqual(
      tester.getActionsCalled(),
      [
        actions.initialize({}),
        actions.inject(schema.initialData(), schema.meta(schema.initialData()))
      ],
      'touched action sequence with no touch update'
    )

    t.equal(tester.getState().test.meta.fields.testfield.touched, false, 'the field is not touched')

    t.end()
  })
*/
  



}

export default testSuite