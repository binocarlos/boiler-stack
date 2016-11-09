import { getItemCodecId, decodeID } from 'folder-ui/lib/db/composite'

/*

  for digger items use the tag
  for storage items the mongo db will inject a _type property
  
*/
const getItemType = (item = {}) => {
  const type = item._digger ?
    item._digger.tag :
    item._type
  return (type || '').toLowerCase()
}

const getItemName = (item = {}) => {
  return (item.name || '').toLowerCase()
}

const diggerTypeSort = (a, b) => {
  if (getItemType(a) < getItemType(b)) return -1;
  if (getItemType(a) > getItemType(b)) return 1;
  if (getItemName(a) < getItemName(b)) return -1;
  if (getItemName(a) > getItemName(b)) return 1;
  return 0;
}

// tells you id a given id is for a top-level database
const isIdTopLevel = (databases, id) => {
  return databases[decodeID(id)] ? true : false
}

// tells you if the database an item belongs to is read-only
const isEditable = (databases, item) => {
  const database = databases[getItemCodecId(item)] || {}
  return database.readOnly ? false : true
}

// tells you if the item can contain children or is just data
const isLeaf = (types, item) => {
  return types.isLeaf(getItemType(item))
}

const getTitle = (types, item) => {
  return types.getTitle(getItemType(item), item)
}

const tools = {
  getItemType,
  getItemName,
  diggerTypeSort,
  isIdTopLevel,
  isEditable,
  isLeaf,
  getTitle
}

export default tools