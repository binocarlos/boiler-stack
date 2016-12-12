var async = require('async')
var Storage = require('../storage')
var tools = require('../tools')


module.exports = function(opts){

  var collaborators = Storage(Object.assign({}, opts, {
    model:'collaborators',
  }))

  /*
    
    return the projects for which a user has an interest
    
  */
  function loadUserCollaborations(userid, logger, done){
    collaborators.loadModels(tools.encodeQuery({
      query:{
        userid:userid
      }
    }), logger, done)
  }

  function loadInstallationCollaborations(installationid, logger, done){
    collaborators.loadModels(tools.encodeQuery({
      query:{
        installationid:installationid
      }
    }), logger, done)
  }

  function deleteInstallationCollaborations(installationid, logger, done){
    async.waterfall([

      function(next){
        loadInstallationCollaborations(installationid, logger, next)
      },

      function(collaborations, next){
        async.parallel(collaborations.map(function(collaboration){
          return function(nextcollaboration){
            collaborators.deleteModel(collaboration._id, logger, nextcollaboration)
          }
        }), next)
      }

    ], done)
  }

  function createInstallationOwner(installationid, userid, logger, done){
    collaborators.addModel({
      userid:userid,
      installationid:installationid,
      permission:'owner'
    }, logger, done)
  }

  return Object.assign({}, collaborators, {
    loadUserCollaborations:loadUserCollaborations,
    loadInstallationCollaborations:loadInstallationCollaborations,
    deleteInstallationCollaborations:deleteInstallationCollaborations,
    createInstallationOwner:createInstallationOwner
  })
}