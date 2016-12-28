import { PUSH } from 'redux-little-router'
import { action } from './tools'

const RouterActions = {
  types:{
    push: PUSH,
  },
  push: (payload) => action(PUSH, { payload })
}

export default RouterActions