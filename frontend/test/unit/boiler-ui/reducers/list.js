import Tape from 'tape'
import ListReducer, { DEFAULT_STATE } from '../../../../src/boiler-ui/lib/reducers/list'
import TriggerActions from '../../../../src/boiler-ui/lib/actions/trigger'

const tape = (name, handler) => Tape('unit -> reducer -> list' + name, handler)

const listReducerTests = (opts = {}) => {

  const actions = TriggerActions('BASE')

  const getReducer = () => ListReducer({
    update: actions.types.trigger
  })

  tape('', t => {
    const reducer = getReducer()

    t.deepEqual(reducer(undefined, {}), DEFAULT_STATE, 'initial state')

    t.deepEqual(reducer(undefined, actions.trigger()), {
      db: {},
      ids: []
    }, 'null list')

    t.deepEqual(reducer(undefined, actions.trigger([])), {
      db: {},
      ids: []
    }, 'empty list')
    
    t.deepEqual(reducer(undefined, actions.trigger([{
      id: 10,
      name: 'a'
    }, {
      id: 11,
      name: 'b'
    }])), {
      db: {
        '10': {
          id: 10,
          name: 'a'
        },
        '11': {
          id: 11,
          name: 'b'
        }
      },
      ids: [10, 11]
    }, 'with data')
    t.end()
  })


}

export default listReducerTests