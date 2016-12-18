import {
  action,
  getTypes
} from './tools'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const requestTypes = [REQUEST, SUCCESS, FAILURE]
const apiTypes = (base) => {
  return getTypes(base, requestTypes)
}

const ApiActions = (base) => {
  const types = apiTypes(base)
  return {
    types,
    request: (query = {}, data) => action(types.REQUEST, {query, data}),
    success: (data, query = {}) => action(types.SUCCESS, {data, query}),
    failure: (error, query = {}) => action(types.FAILURE, {error, query})
  }
}

export default ApiActions