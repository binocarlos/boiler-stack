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
    request: (query = {}, data) => action(types.request, {query, data}),
    success: (data, query = {}) => action(types.success, {data, query}),
    failure: (error, query = {}) => action(types.failure, {error, query})
  }
}

export default ApiActions