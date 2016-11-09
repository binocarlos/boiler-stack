const Storage = require('../storage')

module.exports = function(opts){

  var quotes = Storage(Object.assign({}, opts, {
    model:'quotes',
  }))

  /*
  
    load all the quotes within one project
    
  */
  function loadProjectQuotes(projectid, done){

    collaborators.loadModels(encodeQuery({
      query:{
        projectid:projectid
      }
    }), done)

  }

  return Object.assign({}, quotes, {
    loadProjectQuotes:loadProjectQuotes
  })
}