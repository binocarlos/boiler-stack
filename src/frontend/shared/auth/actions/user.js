import apiAction from '../../api/action'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_RECEIVE = 'USER_RECEIVE'
export const USER_ERROR = 'USER_ERROR'

export function fetchUser(url) {

  return apiAction(url, [
    USER_REQUEST,
    USER_RECEIVE,
    USER_ERROR
  ])

}