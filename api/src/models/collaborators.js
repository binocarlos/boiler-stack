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
  function loadUserProjectIds(userid, done){
    collaborators.loadModels(encodeQuery({
      query:{
        userid:userid
      },
      select:{
        projectid:1
      }
    }), function(err, models){
      if(err) return done(err)
      done(null, models.map(function(model){
        return model.projectid
      }))
    })
  }

  return Object.assign({}, collaborators, {
    loadUserProjectIds:loadUserProjectIds
  })
}