import {
  action,
  getTypes
} from './tools'

const SwitchActions = (base) => {
  const types = getTypes(base, [
    'SWITCH'
  ])
  return {
    types,
    switch: (value) => action(types.switch, {value})
  }
}

export default SwitchActions