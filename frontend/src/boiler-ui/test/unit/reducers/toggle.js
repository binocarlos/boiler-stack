import Tape from 'tape'
import ToggleReducer from '../../../src/reducers/toggle'
import ToggleActions from '../../../src/actions/toggle'

const tape = (name, handler) => Tape('unit -> reducer -> toggle -> ' + name, handler)

const toggleReducerTests = (opts = {}) => {

  const actions = ToggleActions('BASE')

  const getReducer = () => ToggleReducer(actions.types)

  tape('initial state', t => {
    const reducer = getReducer()
    t.deepEqual(reducer(undefined, {}), {
      open: false,
      payload: null
    })
    t.end()
  })

  tape('toggle', t => {
    const reducer = getReducer()
    t.deepEqual(reducer(undefined, actions.toggle(true, 10)), {
      open: true,
      payload: 10
    }, 'open with payload')
    t.deepEqual(reducer(undefined, actions.toggle(false)), {
      open: false,
      payload: null
    }, 'close with no payload')
    t.end()
  })

  tape('open', t => {
    const reducer = getReducer()
    t.deepEqual(reducer(undefined, actions.open(10)), {
      open: true,
      payload: 10
    }, 'with payload')
    t.deepEqual(reducer(undefined, actions.open()), {
      open: true,
      payload: null
    }, 'no payload')
    t.end()
  })

  tape('close', t => {
    const reducer = getReducer()
    t.deepEqual(reducer(undefined, actions.close(10)), {
      open: false,
      payload: 10
    }, 'with payload')
    t.deepEqual(reducer(undefined, actions.close()), {
      open: false,
      payload: null
    }, 'no payload')
    t.end()
  })

}

export default toggleReducerTests