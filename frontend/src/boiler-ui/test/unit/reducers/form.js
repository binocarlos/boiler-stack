import Tape from 'tape'
import FormReducer from '../../../src/reducers/form'
import FormActions from '../../../src/actions/form'

const tape = (name, handler) => Tape('unit -> reducer -> form -> ' + name, handler)

const formReducerTests = (opts = {}) => {

  const actions = FormActions('BASE')
  
  tape('initial state', t => {
    const reducer = FormReducer(actions.types)
    t.deepEqual(reducer(undefined, {}), {
      data: {},
      meta: {},
      originalData: {},
      originalMeta: {}
    })
    t.end()
  })

  tape('inject', t => {
    const reducer = FormReducer(actions.types)
    t.deepEqual(reducer(undefined, actions.inject({a:10}, {b:3})), {
      data: {a:10},
      meta: {b:3},
      originalData: {a:10},
      originalMeta: {b:3}
    })
    t.end()
  })

  tape('update', t => {
    const reducer = FormReducer(actions.types)
    t.deepEqual(reducer(undefined, actions.update('c.d.e', 10, {valid:true})), {
      data: {c:{d:{e:10}}},
      meta: {c:{d:{e:{valid:true}}}},
      originalData: {},
      originalMeta: {}
    })
    t.end()
  })

  tape('revert', t => {
    const reducer = FormReducer(actions.types)
    const result = reducer({
      data: {a:11},
      meta: {a:11},
      originalData: {a:10},
      originalMeta: {a:10}
    }, actions.revert())

    t.deepEqual(result, {
      data: {a:10},
      meta: {a:10},
      originalData: {a:10},
      originalMeta: {a:10}
    })
    
    t.end()
  })


}

export default formReducerTests
