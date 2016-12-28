// deals with the result from /auth/v1/status

import update from 'immutability-helper'
import deepCheck from 'deep-check-error'

export const DEFAULT_STATE = {
  request_count: 0,
  loggedIn: false,
  id: null,
  username: null,
  userdata: {}
}

const REQUIRED_TYPES = [
  'update'
]

const reduceUser = (state, user) => {
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
    userdata: {
      $set: user.data || {}
    },
    request_count: {
      $set: state.request_count + 1
    }
  })
}

const reduceGuest = (state) => {
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
    userdata: {
      $set: {}
    },
    request_count: {
      $set: state.request_count + 1
    }
  })
}

const UserReducer = (types = {}) => {
  deepCheck(types, REQUIRED_TYPES)

  return (state = DEFAULT_STATE, action) => {
    switch (action.type) {

      case types.update:

        const payload = action.payload || {}

        return payload.loggedIn ?
          reduceUser(state, payload.data) :
          reduceGuest(state)
          
      default:
        return state
    }
  }
}

export default UserReducer