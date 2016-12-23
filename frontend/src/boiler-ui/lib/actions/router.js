import { PUSH } from 'redux-little-router'
import { action } from './tools'

const RouterActions = () => {
  return {
    types:{
      push: PUSH,
    },
    push: (payload) => action(PUSH, { payload })
  }
}

export default RouterActions