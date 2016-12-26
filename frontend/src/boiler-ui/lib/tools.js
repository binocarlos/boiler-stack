import immutable from 'object-path-immutable'
import objectPath from 'object-path'

export const ucfirst = (val = '') => {
  return val.replace(/^\w/, (st) => st.toUpperCase())
}

export const getPathnameValue = (pathname) => (data = {}) => objectPath.get(data, pathname)
export const setPathnameValue = (pathname) => (value, data = {}) => immutable.set(data, pathname, value)

export const getPathnameTitle = (pathname) => {
  return pathname
    .split('.')
    .map(ucfirst)
    .join(' : ')
}

export const serialize = (val) => {
  return JSON.parse(JSON.stringify(val))
}

// item tools
export const getItemName = (item = {}) => {
  return (item.name || '').toLowerCase()
}

export const nameSort = (a, b) => {
  if (getItemName(a) < getItemName(b)) return -1;
  if (getItemName(a) > getItemName(b)) return 1;
  return 0;
}

export const typeSort = (a, b, getItemType) => {
  if (getItemType(a) < getItemType(b)) return -1;
  if (getItemType(a) > getItemType(b)) return 1;
  if (getItemName(a) < getItemName(b)) return -1;
  if (getItemName(a) > getItemName(b)) return 1;
  return 0;
}

export const getLabel = (st = '') => st.replace(/\W/g, '').toLowerCase()

export const getFunctionName = (fun) => {
  let ret = fun.toString()
  ret = ret.substr('function '.length)
  ret = ret.substr(0, ret.indexOf('('))
  return ret
}

export const absolutePath = (basepath) => (pathname) => basepath + pathname
export const relativePath = (basepath) => (pathname = '') => {
  const ret = pathname.substr(basepath.length)
  return ret && ret.length > 0 ?
    ret :
    '/'
}