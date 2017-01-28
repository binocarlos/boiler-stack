import {
  action,
  getTypes
} from './tools'

const ApiActions = (base) => {
  const types = getTypes(base, [
    'REQUEST',
    'SUCCESS',
    'FAILURE'
  ])
  return {
    types,
    base,
    request: (query = null, payload = null) => action(types.request, {query, payload}),
    success: (query = null, payload = null) => action(types.success, {query, payload}),
    failure: (query = null, payload = null) => action(types.failure, {query, payload})
  }
}

export default ApiActions