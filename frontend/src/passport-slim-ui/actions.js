const REQUEST = 'REQUEST'
const LOADING = 'LOADING'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
  return [REQUEST, LOADING, SUCCESS, FAILURE].reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}

export const PASSPORT_STATUS = createRequestTypes('PASSPORT_STATUS')
export const PASSPORT_LOGIN = createRequestTypes('PASSPORT_LOGIN')
export const PASSPORT_REGISTER = createRequestTypes('PASSPORT_REGISTER')

export const PASSPORT_FORM_UPDATE = 'PASSPORT_FORM_UPDATE'
export const PASSPORT_MAKE_ROUTE_ASSERTION = 'PASSPORT_MAKE_ROUTE_ASSERTION'
export const PASSPORT_CLEAR_ROUTE_ASSERTION = 'PASSPORT_CLEAR_ROUTE_ASSERTION'

function action(type, payload = {}) {
  return {type, ...payload}
}

export const status = {
  request: (noloading) => action(PASSPORT_STATUS.REQUEST, {noloading}),
  loading: () => action(PASSPORT_STATUS.LOADING),
  success: (data) => action(PASSPORT_STATUS.SUCCESS, {data}),
  failure: (error) => action(PASSPORT_STATUS.FAILURE, {error})
}

export const login = {
  request: (data) => action(PASSPORT_LOGIN.REQUEST, {data}),
  loading: () => action(PASSPORT_LOGIN.LOADING),
  success: (data) => action(PASSPORT_LOGIN.SUCCESS, {data}),
  failure: (error) => action(PASSPORT_LOGIN.FAILURE, {error})
}

export const register = {
  request: (data) => action(PASSPORT_REGISTER.REQUEST, {data}),
  loading: () => action(PASSPORT_REGISTER.LOADING),
  success: (data) => action(PASSPORT_REGISTER.SUCCESS, {data}),
  failure: (error) => action(PASSPORT_REGISTER.FAILURE, {error})
}

export const formupdate = (form, data, meta) => action(PASSPORT_FORM_UPDATE, {form, data, meta})
export const makeRouteAssertion = (rule, failureRedirect) => action(PASSPORT_MAKE_ROUTE_ASSERTION, {rule, failureRedirect})
export const clearRouteAssertion = () => action(PASSPORT_CLEAR_ROUTE_ASSERTION)