const Storage = require('../storage')
const Accounts = require('./accounts')
const littleid = require('./littleid')
const tools = require('../tools')

module.exports = function(opts){

  var clients = littleid(Storage(Object.assign({}, opts, {
    model:'clients'
  })))

  var accounts = Accounts()

  /*
  
    load all the clients within one project
    
  */
  function loadAccountClients(id, done){
    accounts.processId(id, function(err, fullid){
      if(err) return done(err)
      var query = tools.encodeQuery({
        query:{
          accountid:fullid
        }
      })
      clients.loadModels(query, done)
    })
  }

  function addAccountClient(id, data, done){
    accounts.processId(id, function(err, fullid){
      if(err) return done(err)
      data.accountid = fullid
      clients.addModel(data, done)
    })
  }

  return Object.assign({}, clients, {
    loadAccountClients:loadAccountClients,
    addAccountClient:addAccountClient
  })
}