import { PUSH } from 'redux-little-router'
import { action } from './tools'

const RouterActions = {
  types:{
    push: PUSH,
    changed: 'ROUTER_LOCATION_CHANGED'
  },
  push: (payload) => action(PUSH, { payload })
}

export default RouterActions