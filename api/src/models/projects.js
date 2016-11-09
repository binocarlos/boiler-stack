const async = require('async')
const Storage = require('../storage')
const Collaborators = require('./collaborators')

module.exports = function(opts){

  var projects = Storage(Object.assign({}, opts, {
    model:'projects',
  }))

  var collaborators = Collaborators(opts)

  /*
  
    load the project ids from the collaborator table
    then load each project mapping it's id onto data
    
  */
  function loadUserProjects(userid, done){

    async.waterfall([

      function(next){
        collaborators.loadUserProjectIds(userid, next)
      },

      function(projectids, next){
        async.parallel(projectids.map(function(projectid){
          return function(nextproject){
            projects.loadModel(projectid, nextproject)
          }
        }), next)
      }
    ], done)

  }

  return Object.assign({}, projects, {
    loadUserProjects:loadUserProjects
  })
}