import Tape from 'tape'
import ValueActions from '../../../src/actions/value'

const tape = (name, handler) => Tape('unit -> actions -> value -> ' + name, handler)

const valueActionTests = (opts = {}) => {
  
  tape('types', t => {
    const actions = ValueActions('BASE')
    t.deepEqual(
      actions.types,
      {
        set: 'BASE_SET',
        reset: 'BASE_RESET'
      }
    )
    t.end()
  })

  tape('set', t => {
    const actions = ValueActions('BASE')
    t.deepEqual(
      actions.set(5),
      {
        type: 'BASE_SET',
        data: 5
      }
    )
    t.end()
  })

  tape('reset', t => {
    const actions = ValueActions('BASE')
    t.deepEqual(
      actions.reset(),
      {
        type: 'BASE_RESET'
      }
    )
    t.end()
  })

}

export default valueActionTests
