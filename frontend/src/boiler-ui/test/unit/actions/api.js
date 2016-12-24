import Tape from 'tape'
import ApiActions from '../../../src/actions/api'

const tape = (name, handler) => Tape('unit -> actions -> api -> ' + name, handler)

const testQueryCombinations = (t, action, type) => {
  t.deepEqual(
    action({size:10}, {apples:20}), 
    {
      type: type,
      query: {size:10},
      payload: {apples:20}
    },
    'with query and data'
  )
  t.deepEqual(
    action(null, {apples:20}), 
    {
      type: type,
      query: null,
      payload: {apples:20}
    },
    'no query'
  )
  t.deepEqual(
    action({a:9}), 
    {
      type: type,
      query: {a:9},
      payload: null
    },
    'no data'
  )
  t.deepEqual(
    action(), 
    {
      type: type,
      query: null,
      payload: null
    },
    'no query or data'
  )
}

const apiActionTests = (opts = {}) => {
  
  tape('types', t => {
    const actions = ApiActions('BASE')
    t.deepEqual(
      actions.types,
      {
        request: 'BASE_REQUEST',
        success: 'BASE_SUCCESS',
        failure: 'BASE_FAILURE'
      }
    )
    t.end()
  })

  tape('request', t => {
    const actions = ApiActions('BASE')
    testQueryCombinations(t, actions.request, 'BASE_REQUEST')
    t.end()
  })

  tape('success', t => {
    const actions = ApiActions('BASE')
    testQueryCombinations(t, actions.success, 'BASE_SUCCESS')
    t.end()
  })

  tape('failure', t => {
    const actions = ApiActions('BASE')
    testQueryCombinations(t, actions.failure, 'BASE_FAILURE')
    t.end()
  })
}

export default apiActionTests
