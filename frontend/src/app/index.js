import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import AppFactory from '../boiler-frontend/factory'
import PassportBoiler from '../passport-slim-ui/passportboiler'

const appSettings = PassportBoiler({
  appURL:'/app'
}, {
  mountElement:document.getElementById('mount')
})

var Root = AppFactory(appSettings)

ReactDOM.render(
  Root,
  document.getElementById('mount')
)