import urls from '../db/urls'

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

export const refreshUserStatus = () => {
  return {}
}