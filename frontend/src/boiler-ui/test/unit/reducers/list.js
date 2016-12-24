import Tape from 'tape'
import ListReducer from '../../../src/reducers/list'
import TriggerActions from '../../../src/actions/trigger'

const tape = (name, handler) => Tape('unit -> reducer -> list -> ' + name, handler)

const listReducerTests = (opts = {}) => {

  const actions = TriggerActions('BASE')

  const getReducer = () => ListReducer({
    update: actions.types.trigger
  })

  tape('initial state', t => {
    const reducer = getReducer()
    t.deepEqual(reducer(undefined, {}), {
      db: {},
      ids: []
    })
    t.end()
  })

  tape('update -> null list', t => {
    const reducer = getReducer()
    const result = reducer(undefined, actions.trigger())
    t.deepEqual(result, {
      db: {},
      ids: []
    })
    t.end()
  })

  tape('update -> empty list', t => {
    const reducer = getReducer()
    t.deepEqual(reducer(undefined, actions.trigger([])), {
      db: {},
      ids: []
    })
    t.end()
  })

  tape('update -> with data', t => {
    const reducer = getReducer()
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
    })
    t.end()
  })


}

export default listReducerTests