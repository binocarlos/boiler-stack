import Tape from 'tape'

const tape = (name, handler) => Tape('unit -> reducer -> api -> ' + name, handler)

const apiReducerTests = (opts = {}) => {
  
  tape('sanity', t => {
    t.equal(10, 10, 'true')
    t.end()
  })

}

export default apiReducerTests
