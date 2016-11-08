/*

  useful tools
  
*/
const getDiggerData = (item = {}) => {
  return item._digger || {}
}

const getItemType = (item = {}) => {
  const digger = getDiggerData(item)
  return (digger.tag || '').toLowerCase()
}

const getItemName = (item = {}) => {
  return (item.name || '').toLowerCase()
}

const getDiggerIcon = (icons, item) => {
  return getIconByType(icons, getItemType(item))
}

const getIconByType = (icons, type) => {
  return icons[type] || icons.file
}

const getIcon = (icons, isIdTopLevel) => (item) =>  {
  return isIdTopLevel(item.id) ?
      getIconByType(icons, 'disk') :
      getDiggerIcon(icons, item)
}

const diggerTypeSort = (a, b) => {
  if (getItemType(a) < getItemType(b)) return -1;
  if (getItemType(a) > getItemType(b)) return 1;
  if (getItemName(a) < getItemName(b)) return -1;
  if (getItemName(a) > getItemName(b)) return 1;
  return 0;
}

const tools = {
  getDiggerData,
  getItemType,
  getItemName,
  getDiggerIcon,
  getIconByType,
  getIcon,
  diggerTypeSort
}

export default tools