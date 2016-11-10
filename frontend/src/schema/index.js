import Icons from './icons'
import Types from './types'
import Library from './library'
import Table from './table'
import Menu from './menu'
import Descriptors from './descriptors'
import Constructor from './constructor'
import Actions from './actions'
import tools from './tools'

const factory = (opts = {}) => {

  const databases = opts.databases

  if(!databases) throw new Error('schema needs databases option')

  const types = Types(opts)

  const getIcon = Icons(opts)
  const isEditable = (item) => tools.isEditable(databases, item)
  const isLeaf = (item) => tools.isLeaf(types, item)
  const getTitle = (item) => tools.getTitle(types, item)
  const getItemType = tools.getItemType
  
  const itemConstructor = Constructor(opts)
  const descriptors = Descriptors(opts)
  const actions = Actions(opts)
  const library = Library(opts)
  const menu = Menu(opts)

  const table = Table({
    isEditable,
    isLeaf,
    getIcon,
    ...opts
  })

  return {
    types:types.types,
    filterActions:actions,
    getNewItem:itemConstructor,
    getDescriptors:descriptors,
    getTableFields:table.getFields,
    getTableLayout:table.getLayout,
    getLibrary:library,
    getMenuChildren:menu,
    getIcon,
    isEditable,
    isLeaf,
    getTitle,
    getItemType
  }
}

export default factory


