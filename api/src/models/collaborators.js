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

  function loadInstallationCollaborations(installationid, done){
    collaborators.loadModels(tools.encodeQuery({
      query:{
        installationid:installationid
      }
    }), done)
  }

  function deleteInstallationCollaborations(installationid, done){
    async.waterfall([

      function(next){
        loadInstallationCollaborations(installationid, next)
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

  function createInstallationOwner(installationid, userid, done){
    collaborators.addModel({
      userid:userid,
      installationid:installationid,
      permission:'owner'
    }, next)
  }

  return Object.assign({}, collaborators, {
    loadUserCollaborations:loadUserCollaborations,
    loadInstallationCollaborations:loadInstallationCollaborations,
    deleteInstallationCollaborations:deleteInstallationCollaborations,
    createInstallationOwner:createInstallationOwner
  })
}