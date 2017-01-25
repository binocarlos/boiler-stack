"use strict";
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const Logger = require('../logger')
const LogMiddleware = require('./logMiddleware')

const logger = Logger('webserver')

function App(settings) {
  const session = settings.session
  const passport = settings.passport

  const app = express()

  app.use(LogMiddleware({
    logger
  }))
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(session)
  app.use(passport.initialize())
  app.use(passport.session())

  return app
}

module.exports = App