import immutable from 'object-path-immutable'
import objectPath from 'object-path'

import { userStatusSelectors } from './plugins/user/selectors'

export const ucfirst = (val = '') => {
  return val.replace(/^\w/, (st) => st.toUpperCase())
}

export const getPathnameValue = (pathname) => (data = {}) => objectPath.get(data, pathname)
export const setPathnameValue = (pathname) => (value, data = {}) => immutable.set(data, pathname, value)
export const stringCompare = (a, b) => {
  return a == b
}

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
  ret = ret.substr(0, ret.indeRouteProcessorxOf('('))
  return ret
}

export const absolutePath = (basepath) => (pathname) => basepath + pathname
export const relativePath = (basepath) => (pathname = '') => {
  const ret = pathname.substr(basepath.length)
  return ret && ret.length > 0 ?
    ret :
    '/'
}

export const getUserState = (state) => {
  const statusSelector = userStatusSelectors((state) => state.user.status)
  return {
    router: state.router,
    loggedIn: statusSelector.loggedIn(state) ? true : false,
    loaded: statusSelector.loaded(state)
  }
}

export const GetRoute = (BASEPATH) => (route) => BASEPATH + route
export const RouteProcessor = (BASEPATH) => (routes = {}) => {
  return Object.keys(routes).reduce((all, route) => {
    return Object.assign({}, all, {
      [BASEPATH + route]: routes[route]
    })
  }, {})
}
export const HomeRouteMatcher = (BASEPATH) => {
  const getRoute = GetRoute(BASEPATH)
  return (location) => {
    if(location.pathname == getRoute('')) return true
    if(location.pathname == getRoute('/')) return true
    return false
  }
}

export const developmentError = (e) => {
  if(process.env.NODE_ENV != 'development') return
  console.log(e.stack)
}