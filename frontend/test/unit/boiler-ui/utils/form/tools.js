import {
  getPathnameValue,
  setPathnameValue
} from '../../../../../src/boiler-ui/lib/tools'

export const exampleField = () => {
  return {
    name: 'testfield',
    get: (data = {}) => data.fruit,
    get: getPathnameValue('fruit'),
    set: setPathnameValue('fruit'),
    getInitial: (data = {}) => 'apples',
    validate: (value, data = {}) => value == 'apples' ? 'still apples' : null
  }
}

export const exampleMeta = (fields = {}) => {
  return {
    custom_error: null,
    fields
  }
}