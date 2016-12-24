import Tape from 'tape'
import SelectionActions from '../../../src/actions/selection'

const tape = (name, handler) => Tape('unit -> actions -> selection -> ' + name, handler)

const selectionActionTests = (opts = {}) => {
  
  tape('types', t => {
    const actions = SelectionActions('BASE')
    t.deepEqual(
      actions.types,
      {
        select: 'BASE_SELECT'
      }
    )
    t.end()
  })

  tape('select', t => {
    const actions = SelectionActions('BASE')
    t.deepEqual(
      actions.select([1,2,3]),
      {
        type: 'BASE_SELECT',
        selected: [1,2,3]
      }
    )
    t.end()
  })

}

export default selectionActionTests
