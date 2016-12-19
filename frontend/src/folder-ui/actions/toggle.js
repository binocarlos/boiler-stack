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
    open: () => action(types.toggle, {open:true}),
    close: () => action(types.toggle, {open:false}),
    toggle: (open = false) => action(types.toggle, {open})
  }
}

export default ToggleActions