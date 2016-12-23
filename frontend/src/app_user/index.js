import 'react-toolbox/lib/commons.scss'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import AppFactory from '../boiler-ui/lib/factory'

import reducer from './reducer'
import sagas from './sagas'
import getRoutes from './routes'

import Wrapper from './containers/Wrapper'
import Screens from './containers/Screens'

const BASE_PATH = '/app'
const INITIAL_STATE = window.__INITIAL_STATE__

const routes = getRoutes({
  basepath: BASE_PATH
})

const render = AppFactory({
  basepath: BASE_PATH,
  initialState: INITIAL_STATE,
  reducer,
  routes,
  sagas
})

ReactDOM.render(
  render(
    <Wrapper>
      <Screens basepath={BASE_PATH} />
    </Wrapper>
  ),
  document.getElementById('mount')
)