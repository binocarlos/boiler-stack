import update from 'react/lib/update'
import {
  GET_PROJECT_DATA,
  SET_CURRENT_PROJECT,
  DIGGER_SELECTOR
} from './actions'

import {
  processDiggerResults
} from './tools'

const INITIAL_STATE = {
  projects:{
    status:null,
    data:null,
    active:null
  },
  digger:{
  }
}

export default function boilerreducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {

    // requst the project data
    case GET_PROJECT_DATA:

      return update(state, {
        projects:{
          status:{
            $set:action.status
          },
          data:{
            $set:action.data
          }
        }
      })

    case SET_CURRENT_PROJECT:

      return update(state, {
        projects:{
          active:{
            $set:action.id
          }
        }
      })

    case DIGGER_SELECTOR:

      
      return update(state, {
        digger:{
          [action.tag]:{
            $set:processDiggerResults(action.data)
          }
        }
      })

    default:
      return state
  }
}