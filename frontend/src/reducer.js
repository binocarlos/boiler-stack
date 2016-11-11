import update from 'react/lib/update'
import {
  GET_PROJECT_DATA,
  SET_CURRENT_PROJECT,
  DIGGER_SELECTOR,
  QUOTE_EDITOR_SETTINGS
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

  },
  quoteEditorSettings:{

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
            $set:{
              data:processDiggerResults(action.data),
              selector:action.selector,
              section:action.section,
              projectId:action.projectId,
              includeCore:action.includeCore
            }
          }
        }
      })

    case QUOTE_EDITOR_SETTINGS:

      return update(state, {
        quoteEditorSettings:{
          [action.name]:{
            $set:action.value
          }
        }
      })

    default:
      return state
  }
}