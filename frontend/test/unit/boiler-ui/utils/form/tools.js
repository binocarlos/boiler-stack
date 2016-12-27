import {
  getPathnameValue,
  setPathnameValue
} from '../../../../../src/boiler-ui/lib/tools'

export const exampleField = (name = 'testfield', field = 'fruit', initialValue = 'apples') => {
  return {
    name,
    get: (data = {}) => data.fruit,
    get: getPathnameValue(field),
    set: setPathnameValue(field),
    compare: (a, b) => a == b,
    getInitial: (data = {}) => initialValue,
    validate: (value, data = {}) => value == initialValue ? 'still ' + initialValue : null
  }
}

export const exampleMeta = (fields = {}) => {
  return {
    custom_error: null,
    fields
  }
}