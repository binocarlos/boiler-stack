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
    request: (payload = null, query = null) => action(types.request, {query, payload}),
    success: (payload = null, query = null) => action(types.success, {query, payload}),
    failure: (payload = null, query = null) => action(types.failure, {query, payload})
  }
}

export default ApiActions