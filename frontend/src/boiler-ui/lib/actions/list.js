import {
  action,
  getTypes
} from './tools'

const ListActions = (base) => {
  const types = getTypes(base, [
    'UPDATE'
  ])
  return {
    types,
    update: (payload) => action(types.update, {payload})
  }
}

export default ListActions