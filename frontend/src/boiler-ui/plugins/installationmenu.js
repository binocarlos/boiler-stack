import React, { Component, PropTypes } from 'react'
import { takeLatest } from 'redux-saga'
import { fork, put, call, take, select } from 'redux-saga/effects'

//import ApiSaga from '../../sagas/api'
//import ApiActions from '../../actions/api'
//import ApiReducer from '../../reducers/api'
//import { virtualTable } from '../../reducers/selectors'

//import {
//  tableItems
//} from '../../reducers/injectors'

const REQUIRED_SETTINGS = [
  'action',
  'selector'
]

const InstallationMenuSaga = (settings = {}) => {

  REQUIRED_SETTINGS.forEach(field => {
    if(!settings[field]) throw new Error(field + ' setting needed')
  })

  const action = settings.action
  const selector = settings.selector

  function *initialLoad() {
    //yield put(actions.status.request())
    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.log('doing initial load for installation menu')
  }
  
  const getSagas = () => {
    return [
      initialLoad
    ]
  }

  return {
    getSagas
  }
}

export default InstallationMenuSaga