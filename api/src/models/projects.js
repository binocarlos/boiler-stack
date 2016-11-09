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
        collaborators.loadUserCollaborations(userid, next)
      },

      function(collaborations, next){
        async.parallel(collaborations.map(function(collaboration){
          return function(nextproject){
            projects.loadModel(collaboration.projectid, function(err, project){
              if(err) return nextproject(err)
              project.permission = collaboration.permission
              return nextproject(null, project)
            })
          }
        }), next)
      }
    ], done)

  }

  /*
  
    first save the project
    then create an association in the collaborators table
    
  */
  function addUserProject(userid, data, done){
    async.waterfall([

      function(next){
        projects.addModel(data, done)
      },

      function(project, next){
        collaborators.addModel({
          userid:userid,
          projectid:project._id,
          permission:'owner'
        }, next)
      }

    ], done)
  }

  return Object.assign({}, projects, {
    loadUserProjects:loadUserProjects,
    addUserProject:addUserProject
  })
}