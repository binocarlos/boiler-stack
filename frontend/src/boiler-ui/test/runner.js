import requireDirectory from 'require-directory'

// if no dirs are specified run them all
const ALL_DIRS = [
  'unit'
]

const runTests = (opts = {}) => {

  let dirs = opts.dir || ALL_DIRS
  if(typeof(dirs) == 'string') dirs = [dirs]
  dirs = dirs
    .map(dir => opts.base ? opts.base + '.' + dir : dir)
    .map(dir => dir.split('.').join('/'))

  dirs.forEach(dir => {
    console.log(dir)
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