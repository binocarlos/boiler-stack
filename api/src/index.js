"use strict";
const Logger = require('./logger')
const logger = Logger('core')

const settings = require('./settings')
const Postgres = require('./postgres')
const Query = require('./query')
const Redis = require('./redis')
const Session = require('./session')
const Passport = require('./passport')

const App = require('./app')

const Routes = require('./routes')
const Models = require('./models')

const tools = require('./tools')

const postgres = Postgres({
  user: settings.postgresuser,
  database: settings.postgresdatabase,
  password: settings.postgrespassword,
  host: settings.postgreshost,
  port: settings.postgresport
})

const query = Query(postgres)

const redis = Redis({
  host: settings.redishost,
  port: settings.redisport,
  db: settings.redisdatabase
})

const session = Session(redis, {
  prefix: settings.redisprefix,
  secret: settings.cookiesecret
})

const models = Models(query)

const passport = Passport(models.user)
const routes = Routes(settings.base, models)
const app = App({
  session,
  passport
})

routes(app)

app.use(tools.errorHandler)

app.listen(settings.port, () => logger({
  action: 'booted'
}))