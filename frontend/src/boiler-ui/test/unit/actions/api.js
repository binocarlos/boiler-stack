import Tape from 'tape'
import ApiActions from '../../../src/actions/api'

const tape = (name, handler) => Tape('unit -> actions -> api -> ' + name, handler)

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
    t.deepEqual(
      actions.request({size:10}, {apples:20}), 
      {
        type: 'BASE_REQUEST',
        query: {size:10},
        input: {apples:20}
      }
    )
    t.end()
  })

  tape('api success action', t => {
    const actions = ApiActions('BASE')
    t.deepEqual(
      actions.success({size:10}, {apples:20}), 
      {
        type: 'BASE_SUCCESS',
        query: {size:10},
        result: {apples:20}
      }
    )
    t.end()
  })

  tape('api failure action', t => {
    const actions = ApiActions('BASE')
    t.deepEqual(
      actions.failure({size:10}, 'network problem'), 
      {
        type: 'BASE_FAILURE',
        query: {size:10},
        error: 'network problem'
      }
    )
    t.end()
  })


}

export default apiActionTests
