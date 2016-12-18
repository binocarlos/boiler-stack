import React, { Component, PropTypes } from 'react'
import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'

import {
  getUserData
} from 'passport-slim-ui/src/selectors'

const REQUIRED_SETTINGS = [
  'saveUser'
]

const InstallationMenuPlugin = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  const action = settings.action
  const selector = settings.selector

  const actions = {
    types:{
      SWITCH_INSTALLATION:'SWITCH_INSTALLATION'
    },
    switch:(id) => {
      return {
        type:'SWITCH_INSTALLATION',
        id
      }
    }
  }

  const getSagas = (store) => {

    function* doSwitchInstallation(action) {
      const user = yield select(getUserData)
      const data = Object.assign({}, user.data)
      data.currentInstallation = action.id
      yield put(settings.saveUser({
        id:action.id,
        message:settings.message
      }, {
        data
      }))
    }

    function* switchInstallation() {
      yield takeLatest(actions.types.SWITCH_INSTALLATION, doSwitchInstallation)
    }

    return [
      switchInstallation
    ]
  }

  return {
    actions,
    getSagas
  }
}

export default InstallationMenuPlugin