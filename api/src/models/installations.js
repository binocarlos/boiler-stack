const async = require('async')
const Storage = require('../storage')
const Collaborators = require('./collaborators')
const tools = require('../tools')
const littleid = require('./littleid')

module.exports = function(opts){

  var installations = littleid(Storage(Object.assign({}, opts, {
    model:'installations'
  })))

  var collaborators = Collaborators(opts)

  /*
  
    load the project ids from the collaborator table
    then load each project mapping it's id onto data
    
  */
  function loadUserInstallations(userid, done){

    async.waterfall([

      function(next){
        collaborators.loadUserCollaborations(userid, next)
      },

      function(collaborations, next){
        async.parallel(collaborations.map(function(collaboration){
          return function(nextinstallation){
            installations.loadModel(collaboration.installationid, function(err, installation){
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
  function addUserInstallation(userid, data, done){
    async.waterfall([

      function(next){
        installations.addModel(data, next)
      },

      function(installation, next){
        collaborators.createInstallationOwner(installation.id, userid, next)
      }

    ], done)
  }

  /*
  
    first remove the installation
    then remove any collaborators with that installationid
    
  */
  function deleteInstallation(installationid, done){

    async.series([
      function(next){
        collaborators.deleteInstallationCollaborations(installationid, next)
      },

      function(next){
        installations.deleteModel(installationid, next)
      }

    ], done)
  }

  return Object.assign({}, installations, {
    loadUserInstallations:loadUserInstallations,
    addUserInstallation:addUserInstallation,
    deleteInstallation:deleteInstallation
  })
}