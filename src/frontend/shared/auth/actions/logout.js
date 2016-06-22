import apiAction from '../../api/action'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_RECEIVE = 'LOGOUT_RECEIVE'
export const LOGOUT_ERROR = 'LOGOUT_ERROR'

export function logoutUser(url) {

  return apiAction({
    url:url,
    method: 'post',
    body: JSON.stringify({})
  }, [
    LOGOUT_REQUEST,
    LOGOUT_RECEIVE,
    LOGOUT_ERROR
  ])

}