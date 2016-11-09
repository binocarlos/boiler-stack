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
        console.log('-------------------------------------------');
        console.log('add project')
        projects.addModel(data, next)
      },

      function(project, next){

        console.log('-------------------------------------------');
        console.log('add collan')
        console.dir(project)
        collaborators.addModel({
          userid:userid,
          projectid:project._id,
          permission:'owner'
        }, function(err, d){
          console.log('-------------------------------------------');
          console.log(err)
          console.log(d)
          next(null, d)
        })
      }

    ], done)
  }

  return Object.assign({}, projects, {
    loadUserProjects:loadUserProjects,
    addUserProject:addUserProject
  })
}