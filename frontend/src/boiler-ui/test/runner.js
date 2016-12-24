import requireDirectory from 'require-directory'
import objectPath from 'object-path'

// if no dirs are specified run them all
const ALL_DIRS = [
  'unit'
]

const convertPathname = (pathname) => './' + pathname.split('.').join('/')

const getTestSuites = (pathnames = [], suite) => {
  if(typeof(suite) == 'object') {
    return Object.keys(suite).reduce((all, key) => {
      return all.concat(getTestSuites(
        pathnames.concat(key),
        suite[key]
      ))
    }, [])
  }
  else if(typeof(suite) == 'function') {
    return [{
      name: pathnames.join('.'),
      runner: suite
    }]
  }
  else {
    throw new Error('unknown testSuite type: ' + typeof(suite))
  }
}

const runTests = (opts = {}) => {

  let pathnames = opts.dir || ALL_DIRS
  if(typeof(pathnames) == 'string') pathnames = [pathnames]
  
  pathnames
    // prepend the base to the pathname
    .map(pathname => opts.base ? opts.base + '.' + pathname : pathname)
    .reduce((all, pathname) => {
      const pathnames = pathname.split('.')
      const dir = convertPathname(pathname)
      const subtree = requireDirectory(module, dir)
      const testSuites = getTestSuites(pathnames, subtree)
        .map(suite => {
          const parts = suite.name.split('.')
          parts.pop()
          return {
            name: parts.join('.'),
            runner: suite.runner
          }
        })
      return all.concat(testSuites)
    }, [])
    .forEach(suite => {
      console.log(suite.name)
    })

  
  /*
  // filter out test suites
  const runSuites = Object.keys(testSuites)
    .filter(key => opts.filter ? key.indexOf(opts.filter) == 0 : true)
    .reduce((all, key) => all.concat([testSuites[key]]), [])

  runSuites.forEach(suite => suite(opts))
  */
}

export default runTests