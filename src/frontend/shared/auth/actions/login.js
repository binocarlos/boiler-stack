import apiAction from '../../api/action'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_RECEIVE = 'LOGIN_RECEIVE'
export const LOGIN_ERROR = 'LOGIN_ERROR'

export function loginUser(url, credentials = {}) {

  return apiAction({
    url:url,
    method: 'post',
    body: JSON.stringify(credentials)
  }, [
    LOGIN_REQUEST,
    LOGIN_RECEIVE,
    LOGIN_ERROR
  ])

}

export function loginUserError(error = '') {
  
  return {
    type:LOGIN_ERROR,
    headers:{},
    statusCode:500,
    error:error
  }

}