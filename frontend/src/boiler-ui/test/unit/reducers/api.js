import Tape from 'tape'
import ApiReducer from '../../../src/reducers/api'
import ApiActions from '../../../src/actions/api'

const tape = (name, handler) => Tape('unit -> reducer -> api' + name, handler)


const apiReducerTests = (opts = {}) => {

  const actions = ApiActions('BASE')
  
  tape('', t => {
    const reducer = ApiReducer(actions.types)

    t.deepEqual(reducer(undefined, {}), {
      loading: false,
      loaded: false,
      query: null,
      error: null
    }, 'initial state')

    t.deepEqual(reducer(undefined, actions.request({a:10}, {b:3})), {
      loading: true,
      loaded: false,
      query: {a:10},
      error: null
    }, 'request')

    t.deepEqual(reducer(undefined, actions.request()), {
      loading: true,
      loaded: false,
      query: null,
      error: null
    }, 'null query')

    t.deepEqual(reducer(undefined, actions.success({a:10}, {b:3})), {
      loading: false,
      loaded: true,
      query: {a:10},
      error: null
    }, 'success')

    t.deepEqual(reducer(undefined, actions.failure({a:10}, 'network problem')), {
      loading: false,
      loaded: true,
      query: {a:10},
      error: 'network problem'
    }, 'failure')
    
    t.deepEqual(reducer({
      loading: false,
      loaded: true,
      query: null,
      error: null
    }, actions.request({a:10})), {
      loading: true,
      loaded: false,
      query: {a:10},
      error: null
    }, 'request resets loading')
    t.end()
  })


}

export default apiReducerTests
