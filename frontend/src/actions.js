/*import { push } from 'react-router-redux'

import {
  refreshUserStatus,
  updateUserData
} from 'boiler-frontend/lib/actions'

import urls from './db/urls'

export const GET_PROJECT_DATA = 'GET_PROJECT_DATA'

export const getProjectData = (database) => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_PROJECT_DATA,
      status: 'loading',
      data: null
    })

    database.loadChildren({}, null, (err, results) => {
      if(err){
        dispatch({
          type: GET_PROJECT_DATA,
          status: 'error',
          data: err
        })
      }
      else {
        dispatch({
          type: GET_PROJECT_DATA,
          status: 'loaded',
          data: results
        })
      }
    })
  }
  
}

export const SET_CURRENT_PROJECT = 'SET_CURRENT_PROJECT'

export const setCurrentProject = (id) => {
  return {
    type: SET_CURRENT_PROJECT,
    id
  }
}

export const requestUpdateUserProject = (id) => {
  return (dispatch, getState) => {
    dispatch(setCurrentProject(id))
    dispatch(updateUser({
      currentProject:id
    }))
    dispatch(push('/projects'))
  }
}

export const refreshUser = (done) => {
  return refreshUserStatus(done)
}

export const updateUser = (data, done) => {
  return updateUserData(data, done)
}
*/
