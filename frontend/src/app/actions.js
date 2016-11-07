import superagent from 'superagent'

export const GET_PROJECT_DATA = 'GET_PROJECT_DATA'

export const getProjectData = (url) => {
  return (dispatch, getState) => {
    dispatch({
      type: GET_PROJECT_DATA,
      mode: 'loading'
    })
  }
  
}