import Tape from 'tape'
import ToggleReducer from '../../../../src/boiler-ui/lib/reducers/toggle'
import ToggleActions from '../../../../src/boiler-ui/lib/actions/toggle'

const tape = (name, handler) => Tape('unit -> reducer -> toggle -> ' + name, handler)

const toggleReducerTests = (opts = {}) => {

  const actions = ToggleActions('BASE')

  const getReducer = () => ToggleReducer(actions.types)

  tape('initial state', t => {
    const reducer = getReducer()

    t.deepEqual(reducer(undefined, {}), {
      open: false,
      payload: null
    }, 'initial state')

    t.deepEqual(reducer(undefined, actions.toggle(true, 10)), {
      open: true,
      payload: 10
    }, 'toggle.open with payload')

    t.deepEqual(reducer(undefined, actions.toggle(false)), {
      open: false,
      payload: null
    }, 'toggle.close with no payload')

    t.deepEqual(reducer(undefined, actions.open(10)), {
      open: true,
      payload: 10
    }, 'open with payload')

    t.deepEqual(reducer(undefined, actions.open()), {
      open: true,
      payload: null
    }, 'open no payload')

    t.deepEqual(reducer(undefined, actions.close(10)), {
      open: false,
      payload: 10
    }, 'close with payload')

    t.deepEqual(reducer(undefined, actions.close()), {
      open: false,
      payload: null
    }, 'close no payload')
    
    t.end()
  })

}

export default toggleReducerTests