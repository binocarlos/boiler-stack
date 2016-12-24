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
    request: (query = {}, input) => action(types.request, {query, input}),
    success: (query = {}, result) => action(types.success, {query, result}),
    failure: (query = {}, error) => action(types.failure, {query, error})
  }
}

export default ApiActions