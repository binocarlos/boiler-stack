const async = require('async')
const Storage = require('../storage')
const Collaborators = require('./collaborators')
const tools = require('../tools')
const littleid = require('./littleid')

module.exports = function(opts){

  var accounts = littleid(Storage(Object.assign({}, opts, {
    model:'accounts'
  })))

  var collaborators = Collaborators(opts)

  /*
  
    load the project ids from the collaborator table
    then load each project mapping it's id onto data
    
  */
  function loadUserAccounts(userid, done){

    async.waterfall([

      function(next){
        collaborators.loadUserCollaborations(userid, next)
      },

      function(collaborations, next){
        async.parallel(collaborations.map(function(collaboration){
          return function(nextaccount){
            accounts.loadModel(collaboration.accountid, function(err, account){
              if(err) return nextaccount(err)
              account.permission = collaboration.permission
              return nextproject(null, account)
            })
          }
        }), next)
      }
    ], done)

  }

  /*
  
    first save the account
    then create an association in the collaborators table
    
  */
  function addUserAccount(userid, data, done){
    async.waterfall([

      function(next){
        accounts.addModel(data, next)
      },

      function(account, next){
        collaborators.createAccountOwner(account.id, userid, next)
      }

    ], done)
  }

  /*
  
    first remove the project
    then remove any collaborators with that projectid
    
  */
  function deleteAccount(accountid, done){

    async.series([
      function(next){
        collaborators.deleteAccountCollaborations(accountid, next)
      },

      function(next){
        projects.deleteModel(projectid, next)
      }

    ], done)
  }

  return Object.assign({}, accounts, {
    loadUserAccounts:loadUserAccounts,
    addUserAccount:addUserAccount,
    deleteModel:deleteAccount
  })
}