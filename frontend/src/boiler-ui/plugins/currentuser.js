import React, { Component, PropTypes } from 'react'
import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'

import ApiSaga from '../../folder-ui/sagas/api'
import ApiActions from '../../folder-ui/actions/api'

import {
  status
} from 'passport-slim-ui/src/actions'

import {
  ApiFactory
} from '../tools'

const REQUIRED_SETTINGS = [
  'url',
  'userEventHandler'
]

// api saga for PUT /api/v1/currentuser
const CurrentUserPlugin = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  const api = ApiFactory({
    type:'mongoendpoint',
    settings:{
      type:'user',
      title:'Current User',
      url:settings.url
    }
  })

  const userEventHandler = settings.userEventHandler

  const actions = {
    put:ApiActions('UPDATE_USER_PUT')
  }

  const getSagas = (store) => {

    const putApi = ApiSaga({
      label:'updateuser:put',
      handler:api.put,
      actions:actions.put,
      trigger:actions.put.types.REQUEST
    })

    function* doAfterPut(action) {
      // tell passport-slim-ui to reload the user data
      // without flagging the loading flag
      // this prevents the app flickering from logged-in
      // to unknown to logged-in
      yield put(status.request(true))
      yield call(userEventHandler, store, {
        message:action.query.message || 'Updated User',
        snackbar:true,
        name:'updateuser',
        action
      })
    }

    function* afterPut() {
      yield takeLatest(actions.put.types.SUCCESS, doAfterPut)
    }

    return [
      putApi,
      afterPut
    ]
  }

  return {
    actions,
    getSagas
  }
}

export default CurrentUserPlugin