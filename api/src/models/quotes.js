const Storage = require('../storage')
const Projects = require('./projects')
const littleid = require('./littleid')
const tools = require('../tools')

module.exports = function(opts){

  var quotes = littleid(Storage(Object.assign({}, opts, {
    model:'quotes'
  })))

  var projects = Projects()

  /*
  
    load all the quotes within one project
    
  */
  function loadProjectQuotes(id, done){
    projects.processId(id, function(err, fullid){
      if(err) return done(err)
      quotes.loadModels(tools.encodeQuery({
        query:{
          projectid:fullid
        }
      }), done)
    })
  }

  function addProjectQuote(id, data, done){
    projects.processId(id, function(err, fullid){
      if(err) return done(err)
      data.projectid = fullid
      quotes.addModel(data, done)
    })
  }

  return Object.assign({}, quotes, {
    loadProjectQuotes:loadProjectQuotes,
    addProjectQuote:addProjectQuote
  })
}