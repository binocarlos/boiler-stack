"use strict";
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const Logger = require('../logger')
const logger = Logger('webserver')

function App(settings) {
  const session = settings.session
  const passport = settings.passport

  const app = express()

/*
  app.use(pino({
    genReqId: (req) => Logger.tracer(req)
  }))
*/
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