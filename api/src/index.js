"use strict";

// imports
const Logger = require('./logger')
const logger = Logger('core')

const tools = require('./tools')
const settings = require('./settings')

const Postgres = require('./database/postgres')
const Redis = require('./database/redis')
const Client = require('./database/client')

const Session = require('./webserver/session')
const Passport = require('./webserver/passport')
const App = require('./webserver/app')

const EventBus = require('./eventBus')
const Controllers = require('./controllers')
const Routes = require('./routes')


// database setup
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

// tooling
const eventBus = EventBus()
const client = Client(postgres)
const controllers = Controllers(client, eventBus)

const passport = Passport(controllers.user)
const app = App({
  session,
  passport
})

// routes
const routes = Routes(settings.base, controllers)
routes(app)
app.use(tools.errorHandler)

// boot
app.listen(settings.port, () => logger({
  action: 'booted'
}))