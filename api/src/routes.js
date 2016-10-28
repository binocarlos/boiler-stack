const path = require('path')
const url = require('url')
const morgan = require('morgan')
const HttpHashRouter = require('http-hash-router')
const concat = require('concat-stream')

var bhttp = require("bhttp")

const logger = morgan('combined')
const VERSION = require(path.join(__dirname, '..', 'package.json')).version

const tools = require('./tools')

module.exports = function(opts){

  opts = opts || {}

  var router = HttpHashRouter()

  router.set(opts.url + '/version', {
    GET:function(req, res){
      res.end(VERSION)
    }
  })

  router.set(opts.url + '/user', {
    GET:function(req, res){

      tools.loadUser(req.headers.cookie, function(err, user){
        if(err){
          res.statusCode = 500
          res.end(err)
          return
        }
        res.setHeader('Content-type', 'application/json')
        res.end(JSON.stringify(user))
      })
      
    }
  })
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