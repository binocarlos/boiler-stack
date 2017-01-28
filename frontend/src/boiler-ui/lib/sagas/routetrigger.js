/*

  a trigger saga that listens for route changes
  and then dispatches actions if anything matches

  it looks for a 'trigger' property of the current route

  the saga accepts a list of triggers to match against

  the trigger will be passed the router state and should 
  return an action that will be dispatch

*/
import Logger from '../logger'
import deepCheck from 'deep-check-error'
import { takeLatest } from 'redux-saga'
import { put, call, fork, select, take  } from 'redux-saga/effects'

import routerActions from '../actions/router'

const ROUTER_CHANGED = routerActions.types.changed

const REQUIRED_SETTINGS = [
  'triggers',
  'userLoadedActionType'
]

const RouteTriggerSaga = (settings = {}) => {

  deepCheck(settings, REQUIRED_SETTINGS)

  const triggers = settings.triggers || {}
  const logger = Logger('saga : routetrigger')

  // actions triggered when the user data is refreshed
  function* processInitialTriggers() {
    const initialTriggers = triggers.initial
    if(initialTriggers){
      if(initialTriggers.constructor === Array) {
        yield initialTriggers.map(action => put(action))
      }
      else{
        yield put(initialTriggers)
      }
    }
    yield call(processRoute)
  }

  function* processRoute() {
    const routerState = yield select(state => state.router)
    const result = routerState.result || {}
    const trigger = result.trigger ? triggers[result.trigger] : null
    if(trigger){
      const triggerAction = trigger(routerState)
      logger('processing', result.trigger, triggerAction)

      if(triggerAction.constructor === Array) {
        yield triggerAction.map(action => put(action))
      }
      else{
        yield put(triggerAction)
      }
    }
  }

  function* root() {
    yield [
      takeLatest(ROUTER_CHANGED, processRoute),
      takeLatest(settings.userLoadedActionType, processInitialTriggers)
    ]
  }

  return root
}

export default RouteTriggerSaga