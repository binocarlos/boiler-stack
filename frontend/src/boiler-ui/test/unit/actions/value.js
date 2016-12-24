import Tape from 'tape'
import ValueActions from '../../../src/actions/value'

const tape = (name, handler) => Tape('unit -> actions -> value' + name, handler)

const valueActionTests = (opts = {}) => {
  
  tape('', t => {
    const actions = ValueActions('BASE')

    t.deepEqual(
      actions.types,
      {
        set: 'BASE_SET',
        reset: 'BASE_RESET'
      },
      'types'
    )

    t.deepEqual(
      actions.set(5),
      {
        type: 'BASE_SET',
        data: 5
      },
      'set'
    )

    t.deepEqual(
      actions.reset(),
      {
        type: 'BASE_RESET'
      },
      'reset'
    )


    t.end()
  })

}

export default valueActionTests
