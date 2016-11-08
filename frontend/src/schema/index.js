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

  return {
    types:Types(opts),
    filterActions:Actions(opts),
    getNewItem:Constructor(opts),
    getDescriptors:Descriptors(opts),
    getTableFields:TableFields({
      ...opts,
      getIcon
    }),
    getLibrary:Library(opts),
    isEditable:(item) => tools.isEditable(databases, item),
    getIcon
  }
}

export default factory


