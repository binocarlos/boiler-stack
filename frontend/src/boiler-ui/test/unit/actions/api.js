import tape from 'tape'

import ApiActions from '../../../src/actions/api'

const runTests = (opts = {}) => {
  
  tape('action types', t => {
    const actions = ApiActions('BASE')
    t.deepEqual(
      actions.types,
      {
        request: 'BASE_REQUEST',
        success: 'BASE_SUCCESS',
        failure: 'BASE_FAILURE'
      },
      'types correct'
    )
    t.end()
  })

  tape('request', t => {
    const actions = ApiActions('BASE')
    t.deepEqual(
      actions.request({size:10}, {apples:20}), 
      {
        type: 'BASE_REQUEST',
        query: {size:10},
        datA: {apples:20}
      },
      'request action correct'
    )
    t.end()
  })

  tape('success', t => {
    const actions = ApiActions('BASE')
    t.deepEqual(
      actions.request({size:10}, {apples:20}), 
      {
        type: 'BASE_REQUEST',
        query: {size:10},
        datA: {apples:20}
      },
      'request action correct'
    )
    t.end()
  })

  tape('request', t => {
    const actions = ApiActions('BASE')
    t.deepEqual(
      actions.request({size:10}, {apples:20}), 
      {
        type: 'BASE_REQUEST',
        query: {size:10},
        datA: {apples:20}
      },
      'request action correct'
    )
    t.end()
  })


}

export default runTests
