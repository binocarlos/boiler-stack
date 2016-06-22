import apiAction from '../../../shared/api/action'

export const LIBRARY_REQUEST = 'LIBRARY_REQUEST'
export const LIBRARY_RECEIVE = 'LIBRARY_RECEIVE'
export const LIBRARY_ERROR = 'LIBRARY_ERROR'

export function fetchLibrary(url) {

  return apiAction(url, [
    LIBRARY_REQUEST,
    LIBRARY_RECEIVE,
    LIBRARY_ERROR
  ])

}