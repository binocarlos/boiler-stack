import Tape from 'tape'
import RouterActions from '../../../src/actions/router'
import { PUSH } from 'redux-little-router'

const tape = (name, handler) => Tape('unit -> actions -> router -> ' + name, handler)

const routerActionTests = (opts = {}) => {
  
  tape('types', t => {
    const actions = RouterActions()
    t.deepEqual(
      actions.types,
      {
        push: PUSH
      }
    )
    t.end()
  })

  tape('push', t => {
    const actions = RouterActions()
    t.deepEqual(
      actions.push('/apples'),
      {
        type: PUSH,
        payload: '/apples'
      }
    )
    t.end()
  })

}

export default routerActionTests
