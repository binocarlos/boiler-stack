import {
  action,
  getTypes
} from './tools'

const FormActions = (base) => {
  const types = getTypes(base, [
    'INITIALIZE',
    'INJECT',
    'UPDATE',
    'REVERT'
  ])
  return {
    types,

    // we want to reset the form with new data
    // this will not be reduced it's a trigger for the saga
    initialize: (data) => action(types.initialize, {data}),

    // wholesale update the data and meta - this will be reduced
    inject: (data, meta) => action(types.inject, {data, meta}),

    // update the value and meta for a single (possibly nested) key
    update: (pathname, data, meta) => action(types.update, {pathname, data, meta}),

    // revert the data to the last update
    revert: () => action(types.revert)
  }
}

export default FormActions