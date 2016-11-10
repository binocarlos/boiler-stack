const async = require('async')
const Storage = require('../storage')
const Collaborators = require('./collaborators')
const tools = require('../tools')
const littleid = require('./littleid')

module.exports = function(opts){

  var projects = littleid(Storage(Object.assign({}, opts, {
    model:'projects',
  })))

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
        projects.addModel(data, next)
      },

      function(project, next){
        collaborators.addModel({
          userid:userid,
          projectid:project._id,
          permission:'owner'
        }, function(err, d){
          next(null, d)
        })
      }

    ], done)
  }

  /*
  
    first remove the project
    then remove any collaborators with that projectid
    
  */
  function deleteProject(projectid, done){

    var collaborations = []
    async.series([

      function(next){
        collaborators.loadProjectCollaborations(projectid, function(err, results){
          if(err) return next(err)
          collaborations = results
          next()
        })
      },

      function(next){
        async.parallel(collaborations.map(function(collaboration){
          return function(nextcollaboration){
            collaborators.deleteModel(collaboration._id, nextcollaboration)
          }
        }), next)
      },

      function(next){
        projects.deleteModel(projectid, next)
      }

    ], done)
  }

  return Object.assign({}, projects, {
    loadUserProjects:loadUserProjects,
    addUserProject:addUserProject,
    loadModel:function(id, done){
      projects.processId(id, function(err, fullid){
        if(err) return done(err)
        projects.loadModel(fullid, done)
      })
    },
    saveModel:function(id, data, done){
      projects.processId(id, function(err, fullid){
        if(err) return done(err)
        projects.saveModel(fullid, data, done)
      })
    },
    deleteModel:function(id, done){
      projects.processId(id, function(err, fullid){
        if(err) return done(err)
        deleteProject(fullid, done)
      })
    }
  })
}