import 'react-toolbox/lib/commons.scss'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import AppFactory from '../boiler-ui/lib/factory'

import reducer from './reducer'
import sagas from './sagas'
import {
  routes,
  Routes
} from './containers/Routes'

import Wrapper from './containers/Wrapper'

const render = AppFactory({
  reducer,
  routes,
  sagas
})

ReactDOM.render(
  render(
    <Wrapper>
      <Routes />
    </Wrapper>
  ),
  document.getElementById('mount')
)