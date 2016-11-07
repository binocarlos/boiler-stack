import update from 'react/lib/update'
import {
  GET_PROJECT_DATA
} from './actions'

const INITIAL_STATE = {
  projectData:{
    status:null,
    error:null,
    data:null
  }
}

export default function boilerreducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {

    // requst the project data
    case GET_PROJECT_DATA:

      return update(state, {
        projectData:{
          $set:{
            status:action.status,
            error:action.error,
            data:action.data
          }
        }
      })

    default:
      return state
  }
}