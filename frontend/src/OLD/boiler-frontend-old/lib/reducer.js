import update from 'immutability-helper'
import * as actions from './actions'
const DEFAULT_STATE = {
  // controls the menu drawer inside of AuthWrapper -> AppBar
  menu:{
    open:false
  },
  snackbar:{
    open:false,
    message:''
  }
}

const boilerreducer = (state = DEFAULT_STATE, action = {}) => {
  switch (action.type) {
    case actions.BOILER_TOGGLE_MENU:
      return update(state, {
        menu:{
          open:{
            $set:action.open
          }
        }
      })

    case actions.BOILER_OPEN_SNACKBAR:
      return update(state, {
        snackbar:{
          $merge:{
            open:true,
            message:action.message
          }
        }
      })

    case actions.BOILER_CLOSE_SNACKBAR:
      return update(state, {
        snackbar:{
          $merge:{
            open:false,
            message:''
          }
        }
      })
      
    default:
      return state
  }
}

export default boilerreducer