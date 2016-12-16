import {
  action,
  getTypes
} from './tools'

const TREE_TOGGLE = 'TREE_TOGGLE'
const treeTypes = [TREE_TOGGLE]
const getTreeTypes = (base) => {
  return getTypes(base, treeTypes)
}

const TreeActions = (base) => {
  const types = getTreeTypes(base)
  return {
    types,
    toggle: (id, value) => action(types.TREE_TOGGLE, {id,value})
  }
}

export default TreeActions