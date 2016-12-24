import actions from './actions'

const testSuites = {
  actions: actions
}

const runTests = (opts = {}) => {

  // filter out test suites
  const runSuites = Object.keys(testSuites)
    .filter(key => opts.filter ? opts.filter == key : true)
    .reduce((all, key) => all.concat([testSuites[key]]), [])

  runSuites.forEach(suite => suite(opts))
}

export default runTests