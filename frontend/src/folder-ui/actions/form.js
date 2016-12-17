import {
  action,
  getTypes
} from './tools'

const REQUEST_INITIAL_DATA = 'REQUEST_INITIAL_DATA'
const INITIALIZE_DATA = 'INITIALIZE_DATA'
const UPDATE = 'UPDATE'
const REVERT = 'REVERT'
const formTypes = [REQUEST_INITIAL_DATA, INITIALIZE_DATA, UPDATE, REVERT]

const getFormTypes = (base) => {
  return getTypes(base, formTypes)
}

const FormActions = (base) => {
  const types = getFormTypes(base)
  return {
    types,
    // trigger to load the data initially into the form
    requestInitialData: (mode, params) => action(types.REQUEST_INITIAL_DATA, {mode, params}),
    // send the initial data into the reducer
    initializeData: (data) => action(types.INITIALIZE_DATA, {data}),
    update: (data, meta) => action(types.UPDATE, {data, meta}),
    revert: () => action(types.REVERT)
  }
}

export default FormActions