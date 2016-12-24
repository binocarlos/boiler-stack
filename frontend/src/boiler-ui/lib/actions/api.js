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
    success: (query = {}, data) => action(types.success, {query, data}),
    failure: (query = {}, error) => action(types.failure, {query, error})
  }
}

export default ApiActions