import { getItemCodecId, decodeID } from 'folder-ui/lib/db/composite'

import Icons from './icons'
import Types from './types'
import Library from './library'
import TableFields from './tableFields'
import tools from './tools'

const factory = (opts = {}) => {

  const databases = opts.databases

  if(!databases) throw new Error('schema needs databases option')

  const icons = Icons(opts)

  // tells you id a given id is for a top-level database
  const isIdTopLevel = (id) => {
    return databases[decodeID(id)] ? true : false
  }

  // tells you if the database an item belongs to is read-only
  const isEditable = (item) => {
    const database = databases[getItemCodecId(item)] || {}
    return database.readOnly ? false : true
  }

  const filterActions = (context, actions) => {
    let disableActions = {}

    // this means the current focus is a top-level database container
    if(isIdTopLevel(context.parent.id)){
      disableActions.edit = context.selected.length<=0
    }

    return actions
      .filter(action => disableActions[action.id] ? false : true)
      .concat(process.env.NODE_ENV ? [{
        id:'debug',
        title:'Debug',
        handler:() => {
          console.log(JSON.stringify(context, null, 4))
        }
      }] : [])
  }

  const getNewItem = (parent, descriptor) => {
    return descriptor.initialData
  }

  const getDescriptors = (parent, descriptors = []) => {
    return descriptors
  }


  return {

    // the schema types
    types:Types(opts),

    // the fields to appear in the children table
    tableFields:TableFields(opts),

    // the extra LIBRARY items for biro
    library:Library(opts),

    isEditable,
    filterActions,
    getNewItem,
    getDescriptors,

    // get icon function from tools
    getIcon:tools.getIcon(icons, isIdTopLevel)
  }
}

export default factory


