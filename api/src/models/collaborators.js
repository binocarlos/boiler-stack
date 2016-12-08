const async = require('async')
const Storage = require('../storage')
const tools = require('../tools')


module.exports = function(opts){

  var collaborators = Storage(Object.assign({}, opts, {
    model:'collaborators',
  }))

  /*
    
    return the projects for which a user has an interest
    
  */
  function loadUserCollaborations(userid, done){
    collaborators.loadModels(tools.encodeQuery({
      query:{
        userid:userid
      }
    }), done)
  }

  function loadAccountCollaborations(accountid, done){
    collaborators.loadModels(tools.encodeQuery({
      query:{
        accountid:accountid
      }
    }), done)
  }

  function deleteAccountCollaborations(accountid, done){
    async.waterfall([

      function(next){
        loadAccountCollaborations(accountid, next)
      },

      function(collaborations, next){
        async.parallel(collaborations.map(function(collaboration){
          return function(nextcollaboration){
            collaborators.deleteModel(collaboration._id, nextcollaboration)
          }
        }), next)
      }

    ], done)
  }

  function createAccountOwner(accountid, userid, done){
    collaborators.addModel({
      userid:userid,
      accountid:account._id,
      permission:'owner'
    }, next)
  }

  return Object.assign({}, collaborators, {
    loadUserCollaborations:loadUserCollaborations,
    loadAccountCollaborations:loadAccountCollaborations,
    deleteAccountCollaborations:deleteAccountCollaborations,
    createAccountOwner:createAccountOwner
  })
}