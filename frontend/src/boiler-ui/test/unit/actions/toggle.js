import Tape from 'tape'
import ToggleActions from '../../../src/actions/toggle'

const tape = (name, handler) => Tape('unit -> actions -> toggle' + name, handler)

const toggleActionTests = (opts = {}) => {
  
  tape('types', t => {
    const actions = ToggleActions('BASE')

    t.deepEqual(
      actions.types,
      {
        toggle: 'BASE_TOGGLE'
      },
      'types'
    )

    t.deepEqual(
      actions.toggle(true, 5),
      {
        type: 'BASE_TOGGLE',
        open: true,
        payload: 5
      },
      'toggle'
    )

    t.deepEqual(
      actions.open(5),
      {
        type: 'BASE_TOGGLE',
        open: true,
        payload: 5
      },
      'open'
    )

    t.deepEqual(
      actions.close(5),
      {
        type: 'BASE_TOGGLE',
        open: false,
        payload: 5
      },
      'close'
    )

    t.deepEqual(
      actions.open(),
      {
        type: 'BASE_TOGGLE',
        open: true,
        payload: null
      },
      'open no payload'
    )

    t.end()
  })

}

export default toggleActionTests
