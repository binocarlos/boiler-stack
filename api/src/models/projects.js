const async = require('async')
const Storage = require('../storage')
const Collaborators = require('./collaborators')

module.exports = function(opts){

  var projects = Storage(Object.assign({}, opts, {
    model:'projects',
  })

  var collaborators = Collaborators(opts)

  function loadUserProjects(id, done){
    storage.loadModels({

    }, done)
  }

  return Object.assign({}, projects, {
    loadUserProjects:loadUserProjects
  })
}