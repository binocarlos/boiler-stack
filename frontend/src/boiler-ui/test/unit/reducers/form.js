import Tape from 'tape'
import FormReducer from '../../../src/reducers/form'
import FormActions from '../../../src/actions/form'

const tape = (name, handler) => Tape('unit -> reducer -> form' + name, handler)

const formReducerTests = (opts = {}) => {

  const actions = FormActions('BASE')
  
  tape('', t => {
    const reducer = FormReducer(actions.types)

    t.deepEqual(reducer(undefined, {}), {
      data: {},
      meta: {},
      originalData: {},
      originalMeta: {}
    }, 'initial state')

    t.deepEqual(reducer(undefined, actions.inject({a:10}, {b:3})), {
      data: {a:10},
      meta: {b:3},
      originalData: {a:10},
      originalMeta: {b:3}
    }, 'inject')

    t.deepEqual(reducer(undefined, actions.update('c.d.e', 10, {valid:true})), {
      data: {c:{d:{e:10}}},
      meta: {c:{d:{e:{valid:true}}}},
      originalData: {},
      originalMeta: {}
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
