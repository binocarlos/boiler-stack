import actionTools from './actions/tools'

const testSuites = {
  'action.tools': actionTools
}

const runTests = (opts = {}) => {

  // filter out test suites
  const runSuites = Object.keys(testSuites)
    .filter(key => opts.filter ? key.indexOf(opts.filter) == 0 : true)
    .reduce((all, key) => all.concat([testSuites[key]]), [])

  runSuites.forEach(suite => suite(opts))
}

export default runTests