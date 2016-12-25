import {
  action,
  getTypes
} from './tools'

const ValueActions = (base) => {
  const types = getTypes(base, [
    'SET',
    'RESET'
  ])
  return {
    types,
    base,
    set: (data) => action(types.set, {data}),
    reset: () => action(types.reset)
  }
}

export default ValueActions