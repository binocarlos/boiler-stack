import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import AppFactory from '../boiler-ui/lib/app'
import app from './app'

const Root = AppFactory(app, {
  // cli overrides here
})
ReactDOM.render(
  Root,
  document.getElementById('mount')
)