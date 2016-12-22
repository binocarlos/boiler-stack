import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import AppFactory from '../boiler-ui/lib/factory'
//import app from './app'

const Root = AppFactory([])
ReactDOM.render(
  Root,
  document.getElementById('mount')
)