import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import AppFactory from '../boiler-ui/lib/factory'
import Core from '../boiler-ui/lib/plugins/core'
//import app from './app'

ReactDOM.render(
  AppFactory([Core()]),
  document.getElementById('mount')
)