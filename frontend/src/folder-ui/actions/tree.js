import {
  action,
  getTypes
} from './tools'

const TOGGLE = 'TOGGLE'
const treeTypes = [TOGGLE]
const getTreeTypes = (base) => {
  return getTypes(base, treeTypes)
}

const TreeActions = (base) => {
  const types = getTreeTypes(base)
  return {
    types,
    toggle: (id, value) => action(types.TOGGLE, {id,value})
  }
}

export default TreeActions