import Tape from 'tape'
import FormReducer, { DEFAULT_STATE } from '../../../../src/boiler-ui/lib/reducers/form'
import FormActions from '../../../../src/boiler-ui/lib/actions/form'

const tape = (name, handler) => Tape('unit -> reducer -> form' + name, handler)

const formReducerTests = (opts = {}) => {

  const actions = FormActions('BASE')
  
  tape('', t => {
    const reducer = FormReducer(actions.types)
    const BASE_STATE = {
      data: {a:10},
      meta: {b:3},
      originalData: {a:10},
      originalMeta: {b:3}
    }

    t.deepEqual(reducer(undefined, {}), DEFAULT_STATE, 'initial state')

    t.deepEqual(reducer(undefined, actions.inject({a:10}, {b:3})), BASE_STATE, 'inject')

    t.deepEqual(reducer(BASE_STATE, actions.updated({a:11}, {b:4})), {
      data: {a:11},
      meta: {b:4},
      originalData: BASE_STATE.data,
      originalMeta: BASE_STATE.meta
    }, 'update')

    t.deepEqual(reducer({
      data: {a:11},
      meta: {a:11},
      originalData: {a:10},
      originalMeta: {a:10}
    }, actions.revert()), {
      data: {a:10},
      meta: {a:10},
      originalData: {a:10},
      originalMeta: {a:10}
    }, 'revert')

    t.end()
  })
}

export default formReducerTests
