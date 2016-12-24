import 'react-toolbox/lib/commons.scss'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import AppFactory from '../boiler-ui/lib/factory'
import Screens from '../boiler-ui/lib/containers/Screens'

import reducer from './reducer'
import sagas from './sagas'
import router from './router'

import Wrapper from './containers/Wrapper'

const BASE_PATH = '/app'
const INITIAL_STATE = window.__INITIAL_STATE__
const routes = router.routes

const render = AppFactory({
  basepath: BASE_PATH,
  initialState: INITIAL_STATE,
  routes,
  reducer,
  sagas
})

ReactDOM.render(
  render(
    <Wrapper>
      <Screens
        basepath={BASE_PATH}
        getFragments={router.fragments}
      />
    </Wrapper>
  ),
  document.getElementById('mount')
)