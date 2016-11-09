import Icons from './icons'
import Types from './types'
import Library from './library'
import TableFields from './tableFields'
import Descriptors from './descriptors'
import Constructor from './constructor'
import Actions from './actions'
import tools from './tools'

const factory = (opts = {}) => {

  const databases = opts.databases

  if(!databases) throw new Error('schema needs databases option')

  const getIcon = Icons(opts)
  const types = Types(opts)

  const utils = {
    isEditable:(item) => tools.isEditable(databases, item),
    isLeaf:(item) => tools.isLeaf(types, item),
    getTitle:(item) => tools.getTitle(types, item),
    getIcon
  }

  return {
    types:types.types,
    filterActions:Actions(opts),
    getNewItem:Constructor(opts),
    getDescriptors:Descriptors(opts),
    getTableFields:TableFields({
      ...opts,
      ...utils
    }),
    getLibrary:Library(opts),
    ...utils
  }
}

export default factory


