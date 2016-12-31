import update from 'immutability-helper'
import * as actions from '../actions'

const DEFAULT_STATE = {
  active:false,
  rule:null,
  failureRedirect:null
}

export default function routeAssertionReducerFactory(opts = {}){

  return function routeAssertionReducer(state = DEFAULT_STATE, action = {}) {
    switch (action.type) {

      case actions.PASSPORT_MAKE_ROUTE_ASSERTION:
        return update(state, {
          $set:{
            active:true,
            rule:action.rule,
            failureRedirect:action.failureRedirect
          }
        })

      case actions.PASSPORT_CLEAR_ROUTE_ASSERTION:
        return update(state, {
          $set:{
            active:false,
            rule:null,
            failureRedirect:null
          }
        })

      default:
        return state
    }
  }
}