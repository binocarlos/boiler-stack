const async = require('async')
const Storage = require('../storage')

function encodeQuery(query){
  if(!query) return null
  var ret = {}
  Object.keys(query || {}).forEach(function(key){
    ret[key] = JSON.stringify(query[key])
  })
  return ret
}

module.exports = function(opts){

  var collaborators = Storage(Object.assign({}, opts, {
    model:'collaborators',
  }))

  /*
    
    return the projects for which a user has an interest
    
  */
  function loadUserCollaborations(userid, done){
    collaborators.loadModels(encodeQuery({
      query:{
        userid:userid
      }
    }), done)
  }

  return Object.assign({}, collaborators, {
    loadUserCollaborations:loadUserCollaborations
  })
}