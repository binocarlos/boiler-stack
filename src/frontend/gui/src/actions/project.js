import apiAction from '../../../shared/api/action'

export const PROJECTS_REQUEST = 'PROJECTS_REQUEST'
export const PROJECTS_RECEIVE = 'PROJECTS_RECEIVE'
export const PROJECTS_ERROR = 'PROJECTS_ERROR'

export function fetchProjects(url) {

  if(!url) throw new Error('url needed for projects action')
    
  return apiAction(url, [
    PROJECTS_REQUEST,
    PROJECTS_RECEIVE,
    PROJECTS_ERROR
  ])

}