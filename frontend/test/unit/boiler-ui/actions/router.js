import Tape from 'tape'
import RouterActions from '../../../../src/boiler-ui/lib/actions/router'
import { PUSH } from 'redux-little-router'

const tape = (name, handler) => Tape('unit -> actions -> router' + name, handler)

const routerActionTests = (opts = {}) => {
  
  tape('', t => {
    const actions = RouterActions()

    t.deepEqual(
      actions.types,
      {
        push: PUSH
      },
      'types'
    )

    t.deepEqual(
      actions.push('/apples'),
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
