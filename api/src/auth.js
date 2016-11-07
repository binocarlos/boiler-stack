/*

  the main authorization module

  at present we let anyone do anything

  but here is where we look after things like:

   * does the user have access to the project
   * is the user an admin and so can see the root app
  
*/
module.exports = function(opts){

  opts = opts || {}

  return {
    project:function(context, done){

      var project = context.project
      var section = context.section
      var user = context.user

      console.log('-------------------------------------------');
      console.log('making auth assertion')
      console.log(JSON.stringify(context, null, 4))

      done()

    }
  }

}