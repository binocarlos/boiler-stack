import update from 'immutability-helper'

const DEFAULT_STATE = {
  selected:[]
}

const tableReducerFactory = (types) => {
  const tableReducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
      case types.selected:
        return update(state, {
          selected:{
            $set:action.selected
          }
        })
      default:
        return state
    }
  }

  return tableReducer
}

export default tableReducerFactory