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

  function loadProjectCollaborations(projectid, done){
    collaborators.loadModels(tools.encodeQuery({
      query:{
        projectid:projectid
      }
    }), done)
  }

  return Object.assign({}, collaborators, {
    loadUserCollaborations:loadUserCollaborations,
    loadProjectCollaborations:loadProjectCollaborations
  })
}