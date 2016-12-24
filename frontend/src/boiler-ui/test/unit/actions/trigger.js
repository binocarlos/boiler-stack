import Tape from 'tape'
import TriggerActions from '../../../src/actions/trigger'

const tape = (name, handler) => Tape('unit -> actions -> trigger -> ' + name, handler)

const triggerActionTests = (opts = {}) => {
  
  tape('types', t => {
    const actions = TriggerActions('BASE')
    t.deepEqual(
      actions.types,
      {
        trigger: 'BASE_TRIGGER'
      }
    )
    t.end()
  })

  tape('trigger', t => {
    const actions = TriggerActions('BASE')
    t.deepEqual(
      actions.trigger(5),
      {
        type: 'BASE_TRIGGER',
        payload: 5
      }
    )
    t.end()
  })

}

export default triggerActionTests
