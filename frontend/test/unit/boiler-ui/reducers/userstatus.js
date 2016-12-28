import Tape from 'tape'
import UserStatusReducer, { DEFAULT_STATE } from '../../../../src/boiler-ui/lib/reducers/userstatus'
import ApiActions from '../../../../src/boiler-ui/lib/actions/api'

const tape = (name, handler) => Tape('unit -> reducer -> user' + name, handler)

const userReducerTests = (opts = {}) => {

  const actions = ApiActions('BASE')

  const getReducer = () => UserStatusReducer({
    update: actions.types.success
  })

  tape('', t => {
    const reducer = getReducer()

    t.deepEqual(reducer(undefined, {}), DEFAULT_STATE, 'initial state')

    t.deepEqual(reducer(undefined, actions.success({
      loggedIn: false
    })), {
      request_count: 1,
      loggedIn: false,
      id: null,
      username: null,
      userdata: {}
    }, 'user not logged in')

    t.deepEqual(reducer(undefined, actions.success({
      loggedIn: true,
      data: {
        id: 10,
        username: 'bob',
        data: {
          fruit: 'oranges'
        }
      }
    })), {
      request_count: 1,
      loggedIn: true,
      id: 10,
      username: 'bob',
      userdata: {
        fruit: 'oranges'
      }
    }, 'user logged in')
    
    t.end()
  })

}

export default userReducerTests