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

// tells you if the database an item belongs to is read-only
const isEditable = (databases, item) => {
  const database = getItemDatabase(databases, item.id) || {}
  return database.readOnly ? false : true
}

// tells you if the item can contain children or is just data
const isLeaf = (types, item) => {
  return types.isLeaf(getItemType(item))
}

const getTitle = (types, item) => {
  return types.getTitle(getItemType(item), item)
}


const getItemDatabaseId = (id) => {
  return getItemCodecId(id)
}

const getItemDatabase = (databases, id) => {
  return databases[getItemCodecId(id)]
}
// tells you id a given id is for a top-level database
const isIdTopLevel = (databases, id) => {
  return getItemDatabase(databases, id) && getItemCodecId(id) == decodeID(id)
}

const tools = {
  getItemType,
  getItemName,
  diggerTypeSort,
  isEditable,
  isLeaf,
  getTitle,
  isIdTopLevel,
  getItemDatabaseId,
  getItemDatabase
}

export default tools