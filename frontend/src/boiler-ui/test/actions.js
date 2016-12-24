import tape from 'tape'

const runTests = (opts = {}) => {
  tape('action creators', t => {
    t.equal(10, 10, 'sanity')
    t.end()
  })
}

export default runTests
