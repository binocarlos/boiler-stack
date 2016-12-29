import Tape from 'tape'
import routerActions from '../../../../src/boiler-ui/lib/actions/router'
import { PUSH } from 'redux-little-router'

const tape = (name, handler) => Tape('unit -> actions -> router' + name, handler)

const routerActionTests = (opts = {}) => {
  
  tape('', t => {
  
    t.deepEqual(
      routerActions.types,
      {
        push: PUSH,
        changed: 'ROUTER_LOCATION_CHANGED'
      },
      'types'
    )

    t.deepEqual(
      routerActions.push('/apples'),
      {
        type: PUSH,
        payload: '/apples'
      },
      'push'
    )

    t.end()
  })
}

export default routerActionTests
