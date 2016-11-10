const async = require('async')
const Storage = require('../storage')
const Collaborators = require('./collaborators')
const tools = require('../tools')

module.exports = function(opts){

  var projects = Storage(Object.assign({}, opts, {
    model:'projects',
  }))

  var addModel = projects.addModel

  projects.addModel = function(data, done){
    data.littleid = tools.littleid()
    addModel(data, done)
  }

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

  /*
  
    turn a short project id into a project long one
    
  */
  function processProjectId(id, done){
    if(!id) return done('no id passed')
    if(tools.isLittleId(id)){
      projects.loadModels(tools.encodeQuery({
        query:{
          littleid:id
        },
        select:{
          _id:1
        }
      }), function(err, projects){
        if(err) return done(err)
        if(!projects || projects.length<=0) return done('no project found')
        done(null, projects[0]._id)
      })
    }
    else{
      done(null, id)
    }
  }

  return Object.assign({}, projects, {
    loadUserProjects:loadUserProjects,
    addUserProject:addUserProject,
    loadModel:function(id, done){
      processProjectId(id, function(err, fullid){
        if(err) return done(err)
        projects.loadModel(fullid, done)
      })
    },
    saveModel:function(id, data, done){
      processProjectId(id, function(err, fullid){
        if(err) return done(err)
        projects.saveModel(fullid, data, done)
      })
    },
    deleteModel:function(id, done){
      processProjectId(id, function(err, fullid){
        if(err) return done(err)
        deleteProject(fullid, done)
      })
    }
  })
}