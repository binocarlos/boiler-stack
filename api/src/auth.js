var tools = require('./tools')
var errorWrapper = tools.errorWrapper

// a generic HTTP route wrapper that is passed
// a custom auth assertion function
//
//  * load the user from the cookie
//  * create a context for the auth handler
//  * run the assertion and return 403 code if error
// 
function sectionWrapper(name, assertion){

  // the inner function is used by individual routes
  // so they can provide some context to the assertion function
  // the routehandler is the actual function to be run once
  // we have made the assertion
  //
  return function routerWrapper(context, handler){

    context.section = name

    // the outer function that is invoked by the HTTP router
    return function routeHandler(req, res, opts){

      req.log.debug({
        section:name,
        context:context,
        opts:opts
      }, 'load user')

      // we load the user so the auth function has some context
      tools.loadUser(req.log, req.headers.cookie, errorWrapper(req.log, res, function(user){

        req.log.debug({
          user:user
        }, 'user loaded')
        
        // build the context object for the auth function from the various opts:
        //
        //   * context - the static context passed by the route handler
        //   * opts.params - any params extracted from the url
        //   * user - loaded from the auth service
        //
        var authContext = Object.assign({}, opts.params, context, {
          user:user.data
        })

        // run the assertion passing it the context
        // we wrap with a 403 error handler
        assertion(authContext, errorWrapper(req.log, res, function(info){

          req.log.debug({
            info:info
          }, 'assertion passed')

          // if we are here the assertion passed
          // now run the actual handler passing some updated context into the params
          handler(req, res, Object.assign({}, opts, {
            user:user.data,
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

  function normalUser(context, done){
    if(!context.user) return done('requires login')
    done() 
  }

  return {
    standard:normalUser,
    users:function(context, done){
      if(!context.user) return done('requires login')
      if(context.user.accesslevel!='superadmin') return done('superadmin access needed for users')
      done()
    }
  }
}

function factory(opts){

  opts = opts || {}

  const assertions = assertionFactory(opts)

  // this is the wrapper for an overall section ('clients' etc)
  return function wrapper(name){
    const assertion = assertions[name] || assertions.standard

    return sectionWrapper(name, assertion)
  }

}

module.exports = factory