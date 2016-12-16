import {
  action,
  getTypes
} from './tools'

const SELECTED = 'SELECTED'
const tableTypes = [SELECTED]

const getTableTypes = (base) => {
  return getTypes(base, tableTypes)
}

const TableActions = (base) => {
  const types = getTableTypes(base)
  return {
    types,
    selected: (ids) => action(types.SELECTED, {ids})
  }
}

export default TableActions