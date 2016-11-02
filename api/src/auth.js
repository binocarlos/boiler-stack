// a function that handles the auth for digger routes
module.exports = function(opts){

  opts = opts || {}

  return {
    project:function(context, done){

      var project = context.project
      var section = context.section
      var user = context.user

      done()

    }
  }

}