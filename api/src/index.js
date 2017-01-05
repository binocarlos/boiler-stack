"use strict";
const Logger = require('./logger')
const logger = Logger('core')

const settings = require('./settings')
const Postgres = require('./postgres')
const Redis = require('./redis')
const Database = require('./database')
const Session = require('./session')
const Passport = require('./passport')
const Queries = require('./model/queries')
const Commands = require('./model/commands')
const App = require('./app')

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

const db = Database(postgres)

const queries = Queries(db)
const commands = Commands(db)

const passport = Passport(queries)

const app = App({
  session,
  passport,
  queries,
  commands,
  base: settings.base
})

app.listen(settings.port, () => logger({
  action: 'booted'
}))