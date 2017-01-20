"use strict";
const Logger = require('./logger')
const logger = Logger('core')

const settings = require('./settings')

const Postgres = require('./database/postgres')
const Query = require('./database/query')
const Redis = require('./database/redis')

const Session = require('./webserver/session')
const Passport = require('./webserver/passport')
const App = require('./webserver/app')

const Switchboard = require('./switchboard')
const Workers = require('./workers')

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
const workers = Workers(models)

Switchboard(models, workers)

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