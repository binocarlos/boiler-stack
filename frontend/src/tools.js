import { getItemCodecId, decodeID } from 'folder-ui/lib/db/composite'

/*

  for digger items use the tag
  for storage items the mongo db will inject a _type property
  
*/
export const getItemType = (item = {}) => {
  const type = item._digger ?
    item._digger.tag :
    item._type
  return (type || '').toLowerCase()
}

export const getItemName = (item = {}) => {
  return (item.name || '').toLowerCase()
}

export const nameSort = (a, b) => {
  if (getItemName(a) < getItemName(b)) return -1;
  if (getItemName(a) > getItemName(b)) return 1;
  return 0;
}

export const diggerTypeSort = (a, b) => {
  if (getItemType(a) < getItemType(b)) return -1;
  if (getItemType(a) > getItemType(b)) return 1;
  if (getItemName(a) < getItemName(b)) return -1;
  if (getItemName(a) > getItemName(b)) return 1;
  return 0;
}

// tells you if the database an item belongs to is read-only
export const isEditable = (databases, item) => {
  const database = getItemDatabase(databases, item.id) || {}
  return database.readOnly ? false : true
}

// tells you if the item can contain children or is just data
export const isLeaf = (types, item) => {
  return types.isLeaf(getItemType(item))
}

export const getTitle = (types, item) => {
  return types.getTitle(getItemType(item), item)
}

export const getItemDatabaseId = (id) => {
  return getItemCodecId(id)
}

export const getItemDatabase = (databases, id) => {
  return databases[getItemCodecId(id)]
}
// tells you id a given id is for a top-level database
export const isIdTopLevel = (databases, id) => {
  return getItemDatabase(databases, id) && getItemCodecId(id) == decodeID(id)
}

export const currency = (string) => {
  const parts = string.split('.')

  const pounds = parts[0] || '0'
  let pence = parts[1] || '00'

  if(pence.length==1){
    pence += '0'
  }

  return '£' + pounds + '.' + pence
}

export const getCurrentProject = (state) => {
  return state.app.projects.active
}