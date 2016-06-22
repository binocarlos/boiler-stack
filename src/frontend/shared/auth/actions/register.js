import apiAction from '../../api/action'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_RECEIVE = 'REGISTER_RECEIVE'
export const REGISTER_ERROR = 'REGISTER_ERROR'

export function registerUser(url, credentials = {}) {
  
  return apiAction({
    url:url,
    method: 'post',
    body: JSON.stringify(credentials)
  }, [
    REGISTER_REQUEST,
    REGISTER_RECEIVE,
    REGISTER_ERROR
  ])

}

export function registerUserError(error = '') {
  
  return {
    type:REGISTER_ERROR,
    headers:{},
    statusCode:500,
    error:error
  }

}