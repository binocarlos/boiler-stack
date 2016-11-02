const path = require('path')
const url = require('url')
const morgan = require('morgan')
const HttpHashRouter = require('http-hash-router')
const concat = require('concat-stream')

const bhttp = require("bhttp")
const diggerFolderUI = require('digger-folder-ui')

const logger = morgan('combined')
const VERSION = require(path.join(__dirname, '..', 'package.json')).version

const tools = require('./tools')
const Auth = require('./auth')

module.exports = function(opts){

  opts = opts || {}

  var router = HttpHashRouter()
  var folderRoutes = diggerFolderUI({
    url:tools.diggerUrl()
  })
  var auth = Auth({

  })

  function errorWrapper(res, fn){
    return function(err, data){
      if(err){
        res.statusCode = 500
        res.end(err.toString())
        return
      }
      fn(data)
    }
  }

  function authWrapper(wrapperOpts, handler){
    return function(req, res, opts){
      tools.loadUser(req.headers.cookie, errorWrapper(res, function(user){
        auth.project({
          project:opts.params.project,
          section:opts.params.section,
          action:wrapperOpts.action,
          params:opts.params,
          user:user
        }, errorWrapper(res, function(info){
          opts.params.user = user
          opts.params.action = wrapperOpts.action
          handler(req, res, opts)
        }))
      }))
    }
  }

  // get the base digger path from the project/section params
  function getDiggerPath(params){
    return [
      'project',
      params.project,
      params.section
    ].join('/')
  }

  router.set(opts.url + '/version', {
    GET:function(req, res){
      res.end(VERSION)
    }
  })

  router.set(opts.url + '/user', {
    GET:function(req, res){

      tools.loadUser(req.headers.cookie, errorWrapper(res, function(user){
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(user))
      }))
      
    }
  })

  var treeHandler = {
    GET:authWrapper({
      action:'tree'
    }, function(req, res, opts){
      folderRoutes.loadTree({
        path:getDiggerPath(opts.params)
      }, errorWrapper(res, function(data){
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(data))
      }))
    })
  }

  // load the tree
  router.set(opts.url + '/db/:project/:section/tree', treeHandler)

  var addHandler = {
    POST:authWrapper({
      action:'add'
    }, function(req, res, opts){
      folderRoutes.addItem(req, {
        id:opts.params.id,
        path:getDiggerPath(opts.params)
      }, errorWrapper(res, function(data){
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(data))
      }))
      
    })
  }

  // add an item
  router.set(opts.url + '/db/:project/:section/add', addHandler)
  router.set(opts.url + '/db/:project/:section/add/:id', addHandler)

/*
  router.set('/path/*', {
    GET:getItemByPath,
    POST:postItemByPath
  })

  router.set('/select/*', {
    GET:selectItemsByPath
  })

  router.set('/item/:id', {
    GET:getItemById,
    POST:postItemById,
    PUT:putItemById,
    DELETE:deleteItemById
  })
*/

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