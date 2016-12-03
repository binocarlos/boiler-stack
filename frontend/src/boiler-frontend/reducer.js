import update from 'immutability-helper'

const DEFAULT_STATE = {
  // controls the menu drawer inside of AuthWrapper -> AppBar
  isMenuOpen:false
}

export default function boilerreducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {

    case 'BOILER_TOGGLE_MENU':

      return update(state, {
        isMenuOpen:{
          $set:action.open
        }
      })
      
    default:
      return state
  }
}