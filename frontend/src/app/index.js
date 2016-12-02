import 'babel-core/register'
import 'babel-polyfill'
import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'

import PassportBoiler from 'passport-slim-ui/lib/passportboiler'
import AppFactory from 'boiler-frontend/lib/factory'

const appSettings = Object.assign({}, PassportBoiler({

}), {
  mountElement:document.getElementById('mount')
})

AppFactory(appSettings)