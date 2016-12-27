import deepCheck from 'deep-check-error'
import Text from '../../components/formfields/Text'
import {
  ucfirst,
  getPathnameValue,
  stringCompare
} from '../../tools'

const REQUIRED_SETTINGS = [
  'name'
]

const text = (settings = {}) => {
  if(typeof(settings) == 'string') {
    settings = {
      name: settings
    }
  }

  deepCheck(settings, REQUIRED_SETTINGS)

  return {
    name: settings.name,
    title: settings.title || ucfirst(settings.name),
    component: Text,
    get: getPathnameValue(settings.name),
    compare: stringCompare
  }
}

export default text