var async = require('async')
var Storage = require('../storage')
var Collaborators = require('./collaborators')
var tools = require('../tools')
var littleid = require('./littleid')

module.exports = function(opts){

  var installations = littleid(Storage(Object.assign({}, opts, {
    model:'installations'
  })))

  var collaborators = Collaborators(opts)

  /*
  
    load the project ids from the collaborator table
    then load each project mapping it's id onto data
    
  */
  function loadUserInstallations(userid, logger, done){

    async.waterfall([

      function(next){
        collaborators.loadUserCollaborations(userid, logger, next)
      },

      function(collaborations, next){
        async.parallel(collaborations.map(function(collaboration){
          return function(nextinstallation){
            installations.loadModel(collaboration.installationid, logger, function(err, installation){
              if(err) return nextinstallation(err)
              installation.permission = collaboration.permission
              return nextinstallation(null, installation)
            })
          }
        }), next)
      }
    ], done)

  }

  /*
  
    first save the installation
    then create an association in the collaborators table
    
  */
  function addUserInstallation(userid, data, logger, done){
    async.waterfall([

      function(next){
        installations.addModel(data, logger, next)
      },

      function(installation, next){
        collaborators.createInstallationOwner(installation.id, userid, logger, next)
      }

    ], done)
  }

  /*
  
    first remove the installation
    then remove any collaborators with that installationid
    
  */
  function deleteInstallation(installationid, logger, done){

    async.series([
      function(next){
        collaborators.deleteInstallationCollaborations(installationid, logger, next)
      },

      function(next){
        installations.deleteModel(installationid, logger, next)
      }

    ], done)
  }

  return Object.assign({}, installations, {
    loadUserInstallations:loadUserInstallations,
    addUserInstallation:addUserInstallation,
    deleteInstallation:deleteInstallation
  })
}