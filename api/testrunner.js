"use strict";
const minimist = require('minimist')
const requireDirectory = require('require-directory')
const objectPath = require('object-path')
const fs = require('fs')
const join = require('path').join

const args = minimist(process.argv, {
  alias:{
    d: 'dir',
    b: 'base'
  },
  default:{
    dir: process.env.DIR,
    base: process.env.BASE
  }
})

const convertPathname = (pathname) => './' + pathname.split('.').join('/')
const getBasePath = (basename, pathname) => {
  const splitter = basename && pathname ? '.' : ''
  return basename + splitter + pathname
}
const getTestSuites = (pathnames, suite) => {
  pathnames = pathnames || []
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

const runTests = (opts) => {

  opts = opts || {}
  let pathnames = opts.dir || ''
  const basename = opts.base || ''

  if(typeof(pathnames) == 'string') pathnames = [pathnames]

  pathnames
    // prepend the base to the pathname
    .map(pathname => getBasePath(opts.base, pathname))
    .reduce((all, pathname) => {
      let pathnames = pathname.split('.')
      let parentPathnames = [].concat(pathnames)
      const moduleName = parentPathnames.pop()
      let dir = convertPathname(pathname)
      let moduleFilter = null

      if(fs.existsSync(join(__dirname, '/test/' + dir + '.js'))){
        dir = convertPathname(parentPathnames.join('.'))
        pathnames = parentPathnames
        moduleFilter = moduleName
      }

      dir = './test/' + dir

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
        .filter(suite => {
          return moduleFilter ?
            suite.name == parentPathnames.concat([moduleFilter]).join('.') :
            true
        })
      return all.concat(testSuites)
    }, [])
    .forEach(suite => {
      suite.runner(opts)
    })
}

runTests(args)