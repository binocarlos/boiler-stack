import update from 'react/lib/update'
import {
  GET_PROJECT_DATA,
  SET_CURRENT_PROJECT
} from './actions'

const INITIAL_STATE = {
  projectData:{
    status:null,
    data:null
  },
  currentProject:null
}

export default function boilerreducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {

    // requst the project data
    case GET_PROJECT_DATA:

      return update(state, {
        projectData:{
          $set:{
            status:action.status,
            data:action.data
          }
        }
      })

    case SET_CURRENT_PROJECT:

      return update(state, {
        currentProject:{
          $set:action.id
        }
      })


    default:
      return state
  }
}