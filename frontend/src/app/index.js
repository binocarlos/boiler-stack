import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import injectTapEventPlugin from 'react-tap-event-plugin'

import AppFactory from 'boiler-frontend/lib/factory'
import PassportBoiler from 'passport-slim-ui/lib/passportboiler'

import LoginMessage from './components/LoginMessage'
import RegisterMessage from './components/RegisterMessage'
import UserWelcome from './components/UserWelcome'

const appSettings = Object.assign({}, PassportBoiler({
  loginContent:(<LoginMessage />),
  registerContent:(<RegisterMessage />)
}), {
  welcome:UserWelcome,
  mountElement:document.getElementById('mount')
})

var Root = AppFactory(appSettings)

injectTapEventPlugin()

ReactDOM.render(
  Root,
  document.getElementById('mount')
)
