// deals with the result from /auth/v1/status

import update from 'immutability-helper'
import deepCheck from 'deep-check-error'

const DEFAULT_STATE = {
  loggedIn: false,
  id: null,
  username: null,
  meta: {}
}

const REQUIRED_TYPES = [
  'update'
]

const reduceUser = (state, action) => {
  const user = action.data
  return update(state, {
    loggedIn: {
      $set: true
    },
    id: {
      $set: user.id
    },
    username: {
      $set: user.email || user.username
    },
    meta: {
      $set: user.data || {}
    }
  })
}

const reduceGuest = (state, action) => {
  return update(state, {
    loggedIn: {
      $set: false
    },
    id: {
      $set: null
    },
    username: {
      $set: null
    },
    meta: {
      $set: {}
    }
  })
}

const UserReducer = (types = {}) => {
  deepCheck(types, REQUIRED_TYPES)

  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {

      case types.update:

        return action.loggedIn ?
          reduceUser(state, action) :
          reduceGuest(state, action)
          
      default:
        return state
    }
  }
}

export default UserReducer