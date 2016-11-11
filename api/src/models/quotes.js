const Storage = require('../storage')
const Projects = require('./projects')
const Clients = require('./clients')
const async = require('async')
const littleid = require('./littleid')
const tools = require('../tools')

function getmap(arr){
  var obj = {}
  arr.forEach(function(item){
    obj[item._id] = item
  })
  return obj
}

module.exports = function(opts){

  var quotes = littleid(Storage(Object.assign({}, opts, {
    model:'quotes'
  })))

  var projects = Projects()
  var clients = Clients()

  function loadFullQuotes(id, done){
    async.waterfall([
      function(next){
        projects.processId(id, next)
      },

      function(fullid, next){
        async.parallel({
          quotes:function(nextdata){
            loadProjectQuotes(fullid, nextdata)
          },
          clients:function(nextdata){
            clients.loadProjectClients(fullid, nextdata)
          }
        }, next)
      },

      function(results, next){
        var clientMap = getmap(results.clients)

        next(null, results.quotes.map(function(quote){
          var client = clientMap[quote.clientid]
          if(client){
            quote.client = client
            quote.clientname = client.name  
          }
          return quote
        }))
      }
    ], done)
  }

  /*
  
    load all the quotes within one project
    
  */
  function loadProjectQuotes(id, done){
    projects.processId(id, function(err, fullid){
      if(err) return done(err)
      quotes.loadModels(tools.encodeQuery({
        query:{
          projectid:fullid
        }
      }), done)
    })
  }

  function addProjectQuote(id, data, done){
    projects.processId(id, function(err, fullid){
      if(err) return done(err)
      data.projectid = fullid
      quotes.addModel(data, done)
    })
  }

  return Object.assign({}, quotes, {
    loadProjectQuotes:loadProjectQuotes,
    loadFullQuotes:loadFullQuotes,
    addProjectQuote:addProjectQuote
  })
}