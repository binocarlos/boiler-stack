import update from 'immutability-helper'
import * as actions from '../actions'

const DEFAULT_STATE = {
  data:{},
  meta:{}
}

const requiredOpts = [
  'name'
]

export default function formReducerFactory({ name }){

  if(typeof(name) !== 'string') {
    throw new Error('Expected name to be a string.')
  }

  return function formReducer(state = DEFAULT_STATE, action = {}) {

    switch (action.type) {

      case actions.PASSPORT_FORM_UPDATE:

        if(action.form != name) return state

        return update(state, {
          data:{
            $set:action.data
          },
          meta:{
            $set:action.meta
          }
        })

      default:
        return state
    }
  }
}