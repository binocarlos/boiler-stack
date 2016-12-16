import {
  action,
  getTypes
} from './tools'

const FORM_REQUEST_INITIAL_DATA = 'FORM_REQUEST_INITIAL_DATA'
const FORM_INITIALIZE_DATA = 'FORM_INITIALIZE_DATA'
const FORM_UPDATE = 'FORM_UPDATE'
const FORM_REVERT = 'FORM_REVERT'
const formTypes = [FORM_REQUEST_INITIAL_DATA, FORM_INITIALIZE_DATA, FORM_UPDATE, FORM_REVERT]

const getFormTypes = (base) => {
  return getTypes(base, formTypes)
}

const FormActions = (base) => {
  const types = getFormTypes(base)
  return {
    types,
    // trigger to load the data initially into the form
    requestInitialData: (mode, params) => action(types.FORM_REQUEST_INITIAL_DATA, {mode, params}),
    // send the initial data into the reducer
    initializeData: (data) => action(types.FORM_INITIALIZE_DATA, {data}),
    update: (data, meta) => action(types.FORM_UPDATE, {data, meta}),
    revert: () => action(types.FORM_REVERT)
  }
}

export default FormActions