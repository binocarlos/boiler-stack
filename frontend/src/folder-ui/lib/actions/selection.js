import {
  action,
  getTypes
} from './tools'

const SelectionActions = (base) => {
  const types = getTypes(base, [
    'SELECT'
  ])
  return {
    types,
    select: (selected) => action(types.select, {selected})
  }
}

export default SelectionActions