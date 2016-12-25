import Tape from 'tape'
import ApiReducer from '../../../../src/boiler-ui/lib/reducers/api'
import ApiActions from '../../../../src/boiler-ui/lib/actions/api'

const tape = (name, handler) => Tape('unit -> reducer -> api' + name, handler)


const apiReducerTests = (opts = {}) => {

  const actions = ApiActions('BASE')
  const QUERY = {b:3}
  const PAYLOAD = {a:4}
  
  tape('', t => {
    const reducer = ApiReducer(actions.types)

    t.deepEqual(reducer(undefined, {}), {
      loading: false,
      loaded: false,
      query: null,
      error: null
    }, 'initial state')

    t.deepEqual(reducer(undefined, actions.request(PAYLOAD, QUERY)), {
      loading: true,
      loaded: false,
      query: QUERY,
      error: null
    }, 'request')

    t.deepEqual(reducer(undefined, actions.request()), {
      loading: true,
      loaded: false,
      query: null,
      error: null
    }, 'null query')

    t.deepEqual(reducer(undefined, actions.success(PAYLOAD, QUERY)), {
      loading: false,
      loaded: true,
      query: QUERY,
      error: null
    }, 'success')

    t.deepEqual(reducer(undefined, actions.failure('network problem', QUERY)), {
      loading: false,
      loaded: true,
      query: QUERY,
      error: 'network problem'
    }, 'failure')
    
    t.deepEqual(reducer({
      loading: false,
      loaded: true,
      query: null,
      error: null
    }, actions.request(null, QUERY)), {
      loading: true,
      loaded: false,
      query: QUERY,
      error: null
    }, 'request resets loading')
    t.end()
  })


}

export default apiReducerTests
