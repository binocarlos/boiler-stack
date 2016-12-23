import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import AppFactory from '../boiler-ui/lib/factory'
//import app from './app'

ReactDOM.render(
  AppFactory([]),
  document.getElementById('mount')
)