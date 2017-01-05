"use strict";
const Logger = require('./logger')
const logger = Logger('core')

const settings = require('./settings')
const Postgres = require('./tools/postgres')
const Redis = require('./tools/redis')
const Session = require('./tools/session')
const Passport = require('./tools/passport')

const Model = require('./model')

const App = require('./app')
const raw = require('./model/raw')

const postgres = Postgres({
  user: settings.postgresuser,
  database: settings.postgresdatabase,
  password: settings.postgrespassword,
  host: settings.postgreshost,
  port: settings.postgresport
})

const redis = Redis({
  host: settings.redishost,
  port: settings.redisport,
  db: settings.redisdatabase
})

const session = Session(redis, {
  prefix: settings.redisprefix,
  secret: settings.cookiesecret
})

const model = Model({
  postgres
})

const passport = Passport(model.queries)

const app = App({
  session,
  passport,
  model,
  base: settings.base
})

app.listen(settings.port, () => logger({
  action: 'booted'
}))