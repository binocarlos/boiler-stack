var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var restify = require('express-restify-mongoose')
var tools = require('./tools')
var Models = require('./models')

var logger = morgan('combined')
module.exports = function(opts){

  tools.connectToMongo({
    host:opts.mongohost,
    port:opts.mongoport,
    database:opts.mongodatabase
  })

  var models = Models()
  
  var app = express()
  app.use(logger)
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(methodOverride('X-HTTP-Method-Override'))
  
  restify.serve(app, models.user)
  restify.serve(app, models.project)
  restify.serve(app, models.collaborator)
  restify.serve(app, models.quote)


  return app
}