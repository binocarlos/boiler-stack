import Tape from 'tape'
import ToggleActions from '../../../src/actions/toggle'

const tape = (name, handler) => Tape('unit -> actions -> toggle -> ' + name, handler)

const toggleActionTests = (opts = {}) => {
  
  tape('types', t => {
    const actions = ToggleActions('BASE')
    t.deepEqual(
      actions.types,
      {
        toggle: 'BASE_TOGGLE'
      }
    )
    t.end()
  })

  tape('toggle', t => {
    const actions = ToggleActions('BASE')
    t.deepEqual(
      actions.toggle(true, 5),
      {
        type: 'BASE_TOGGLE',
        open: true,
        payload: 5
      }
    )
    t.end()
  })

  tape('open', t => {
    const actions = ToggleActions('BASE')
    t.deepEqual(
      actions.open(5),
      {
        type: 'BASE_TOGGLE',
        open: true,
        payload: 5
      }
    )
    t.end()
  })

  tape('close', t => {
    const actions = ToggleActions('BASE')
    t.deepEqual(
      actions.close(5),
      {
        type: 'BASE_TOGGLE',
        open: false,
        payload: 5
      }
    )
    t.end()
  })

}

export default toggleActionTests
