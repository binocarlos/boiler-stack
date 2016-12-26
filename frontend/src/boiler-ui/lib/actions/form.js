import {
  action,
  getTypes
} from './tools'

const FormActions = (base) => {
  const types = getTypes(base, [
    'INITIALIZE',
    'LOAD',
    'UPDATE',
    'INJECT',
    'UPDATED',
    'REVERT'
  ])
  return {
    types,
    base,

    // triggers

    // we want to inject new form data for an item that does not exist
    // trigger value initializers & generate meta before calling inject
    initialize: (data) => action(types.initialize, {data}),

    // we want to inject form data for an item that has been loaded
    // generate meta and trigger inject
    load: (data) => action(types.load, {data}),

    // a user event as resulted in a raw value for a schema field
    update: (name, data, meta) => action(types.update, {name, data, meta}),

    // reduced - called by the saga once processing is done

    // once initialize or load have processed - this injects the results into
    // the reducer
    inject: (data, meta) => action(types.inject, {data, meta}),

    // once a field update has been processed
    updated: (name, data, meta) => action(types.updated, {name, data, meta}),

    // revert the data to the last injection
    revert: () => action(types.revert)
  }
}

export default FormActions