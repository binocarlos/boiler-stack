"use strict";
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const pino = require('express-pino-logger')

const Routes = require('./routes')
const tools = require('./tools')

function App(settings) {

  const session = settings.session
  const passport = settings.passport
  const base = settings.base
  const model = settings.model  

  const app = express()

  app.use(pino())
  app.use(bodyParser.urlencoded({
    extended: true
  }))
  app.use(bodyParser.json())
  app.use(cookieParser())
  app.use(session)
  app.use(passport.initialize())
  app.use(passport.session())

  Routes(app, base, model)

  app.use(tools.errorHandler)

  return app
}

module.exports = App