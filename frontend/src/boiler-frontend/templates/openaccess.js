import AppFactory from '../factory'

const DEFAULT_SETTINGS = {
  openAccess:true
}

const openAccessApp = (settings = {}) => {
  return AppFactory(Object.assign({}, DEFAULT_SETTINGS, settings))
}

export default openAccessApp