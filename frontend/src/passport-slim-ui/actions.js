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

export const STATUS = createRequestTypes('STATUS')
export const LOGIN = createRequestTypes('LOGIN')
export const REGISTER = createRequestTypes('REGISTER')

export const PASSPORT_FORM_UPDATE = 'PASSPORT_FORM_UPDATE'

function action(type, payload = {}) {
  return {type, ...payload}
}

export const status = {
  request: () => action(STATUS.REQUEST),
  loading: () => action(STATUS.LOADING),
  success: (data) => action(STATUS.SUCCESS, {data}),
  failure: (error) => action(STATUS.FAILURE, {error})
}

export const login = {
  request: (data) => action(LOGIN.REQUEST, {data}),
  loading: () => action(LOGIN.LOADING),
  success: (data) => action(LOGIN.SUCCESS, {data}),
  failure: (error) => action(LOGIN.FAILURE, {error})
}

export const register = {
  request: (data) => action(REGISTER.REQUEST, {data}),
  loading: () => action(REGISTER.LOADING),
  success: (data) => action(REGISTER.SUCCESS, {data}),
  failure: (error) => action(REGISTER.FAILURE, {error})
}

export const formupdate = (form, data, meta) => action(PASSPORT_FORM_UPDATE, {form, data, meta})