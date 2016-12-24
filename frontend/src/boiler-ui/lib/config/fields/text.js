import deepCheck from 'deep-check-error'

import {
  getPathnameValue,
  setPathnameValue,
  getPathnameTitle
} from '../../tools'

import Validator from './validator'

const REQUIRED_SETTINGS = [
  'name'
]

export const text = (field = {}) => {
  deepCheck(field, REQUIRED_SETTINGS)

  const name = field.name
  const title = field.title

  return {
    name: name,
    type: 'text',
    title: title || getPathnameTitle(name),
    getValue: getPathnameValue(name),
    setValue: setPathnameValue(name),
    validate: Validator(field.validate)
  }
}