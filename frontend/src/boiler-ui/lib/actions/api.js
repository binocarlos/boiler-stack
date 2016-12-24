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
    request: (query, payload) => action(types.request, {query, payload}),
    success: (query, payload) => action(types.success, {query, payload}),
    failure: (query, payload) => action(types.failure, {query, payload})
  }
}

export default ApiActions