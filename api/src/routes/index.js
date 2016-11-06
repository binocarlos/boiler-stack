const path = require('path')
const url = require('url')
const morgan = require('morgan')
const HttpHashRouter = require('http-hash-router')
const concat = require('concat-stream')

const bhttp = require("bhttp")
const diggerFolderUI = require('digger-folder-ui')
const diggerFolderUITools = require('digger-folder-ui/tools')
const errorWrapper = diggerFolderUITools.errorWrapper

const logger = morgan('combined')
const VERSION = require(path.join(__dirname, '..', 'package.json')).version

const tools = require('../tools')
const Auth = require('../auth')

const Digger = require('./digger')
const Version = require('./version')
const User = require('./user')
const Project = require('./project')

module.exports = function(opts){

  opts = opts || {}

  var router = HttpHashRouter()
  

  // TODO: this is a placeholder atm
  var auth = Auth({

  })

  var diggerOpts = Object.assign({}, opts, {
    auth:auth,
    // the frontend route prefix
    frontendPrefix:'project',
    // the backend digger prefix
    backendPrefix:'db',
    // the array of params to map from the route
    paramFields:['project', 'section']
  })

  // this setps up the 
  // /v1/api/db/:project/:section -> (/v1/api/db/apples/oranges)
  // /project/:project/:section-> (/project/apples/oranges)
  Digger(router, diggerOpts)

  Version(router, opts)
  User(router, opts)
  Project(router, opts)

  function handler(req, res) {

    function onError(err) {
      if (err) {
        res.statusCode = err.statusCode || 500;
        res.end(err.message);
      }
    }

    logger(req, res, function (err) {
      if(err) return onError(err)
      router(req, res, {}, onError)
    })
  }

  return handler
}