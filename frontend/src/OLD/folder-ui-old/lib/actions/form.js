import {
  action,
  getTypes
} from './tools'

const FormActions = (base) => {
  const types = getTypes(base, [
    'INITIALIZE',
    'UPDATE',
    'REVERT'
  ])
  return {
    types,
    initialize: (data, meta) => action(types.initialize, {data, meta}),
    update: (data, meta) => action(types.update, {data, meta}),
    revert: () => action(types.revert)
  }
}

export default FormActions