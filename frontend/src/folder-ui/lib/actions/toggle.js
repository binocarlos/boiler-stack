import {
  action,
  getTypes
} from './tools'

const ToggleActions = (base) => {
  const types = getTypes(base, [
    'TOGGLE'
  ])
  return {
    types,
    open: (payload) => action(types.toggle, { open:true, payload }),
    close: (payload) => action(types.toggle, { open:false, payload }),
    toggle: (open = false, payload) => action(types.toggle, { open, payload })
  }
}

export default ToggleActions