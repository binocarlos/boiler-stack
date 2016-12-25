import Tape from 'tape'
import ApiActions from '../../../src/actions/api'

const tape = (name, handler) => Tape('unit -> actions -> api' + name, handler)

const testQueryCombinations = (t, action, type, name) => {
  t.deepEqual(
    action({size:10}, {apples:20}), 
    {
      type: type,
      query: {apples:20},
      payload: {size:10}
    },
    name + ': with query and data'
  )
  t.deepEqual(
    action({apples:20}),
    {
      type: type,
      query: null,
      payload: {apples:20}
    },
    name + ': no query'
  )
  t.deepEqual(
    action(null, {a:9}), 
    {
      type: type,
      query: {a:9},
      payload: null
    },
    name + ': no data'
  )
  t.deepEqual(
    action(), 
    {
      type: type,
      query: null,
      payload: null
    },
    name + ': no query or data'
  )
}

const apiActionTests = (opts = {}) => {
  
  tape('', t => {
    const actions = ApiActions('BASE')
    t.deepEqual(
      actions.types,
      {
        request: 'BASE_REQUEST',
        success: 'BASE_SUCCESS',
        failure: 'BASE_FAILURE'
      },
      'types'
    )
    testQueryCombinations(t, actions.request, 'BASE_REQUEST', 'request')
    testQueryCombinations(t, actions.success, 'BASE_SUCCESS', 'success')
    testQueryCombinations(t, actions.failure, 'BASE_FAILURE', 'failure')
    t.end()
  })
}

export default apiActionTests
