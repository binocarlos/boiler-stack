const tools = require('./tools')
const errorWrapper = tools.errorWrapper

// a generic HTTP route wrapper that is passed
// a custom auth assertion function
//
//  * load the user from the cookie
//  * create a context for the auth handler
//  * run the assertion and return 403 code if error
// 
function sectionWrapper(assertion){

  // the inner function is used by individual routes
  // so they can provide some context to the assertion function
  // the routehandler is the actual function to be run once
  // we have made the assertion
  //
  return function routerWrapper(context, handler){

    // the outer function that is invoked by the HTTP router
    return function routeHandler(req, res, opts){

      // we load the user so the auth function has some context
      tools.loadUser(req.headers.cookie, errorWrapper(res, function(user){

        // build the context object for the auth function from the various opts:
        //
        //   * context - the static context passed by the route handler
        //   * opts.params - any params extracted from the url
        //   * user - loaded from the auth service
        //
        var authContext = Object.assign({}, opts.params, context, {
          user:user.user
        })

        // run the assertion passing it the context
        // we wrap with a 403 error handler
        assertion(authContext, errorWrapper(res, function(info){

          // if we are here the assertion passed
          // now run the actual handler passing some updated context into the params
          handler(req, res, Object.assign({}, opts, {
            user:user,
            context:context
          }))

        // we pass back a forbidden code if the auth module fails
        }, 403))
      }))
    }
  }
}

/*

  assertions

  custom functions that decides on a section by section basis what
  the user can and cannot do


  example context for a digger query


  {
    "project": "core",
    "section": "resources",
    "action": "children",
    "user": {
        "_id": "58226cab426437000123ac8b",
        "__v": 0,
        "accesslevel": "superadmin",
        "provider": "local",
        "username": "",
        "email": "e@e.com",
        "type": "user",
        "name": ""
    }
}
  
*/
const assertionFactory = function(opts){
  opts = opts || {}

  return {
    standard:function(context, done){
      if(!context.user) return done('requires login')
      done()
    },
    users:function(context, done){
      if(!context.user) return done('requires login')
      if(context.user.accesslevel!='superadmin') return done('superadmin access needed for users')
      done()
    },
    projects:function(context, done){
      if(!context.user) return done('requires login')
      done()
    },
    quotes:function(context, done){
      if(!context.user) return done('requires login')
      done()
    },
    digger:function(context, done){
      if(!context.user) return done('requires login')
      done()
    }
  }
}

function factory(opts){

  opts = opts || {}

  const assertions = assertionFactory(opts)

  return function wrapper(name){
    const assertion = assertions[name] || assertions.standard

    return sectionWrapper(assertion)
  }

}

module.exports = factory