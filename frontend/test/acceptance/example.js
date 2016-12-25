import Tape from 'tape'

const tape = (name, handler) => Tape('acceptance -> example' + name, handler)

const exampleAcceptanceTest = (opts = {}) => {
  
  tape('', t => {
    t.equal(10, 10, 'sanity')
    t.end()
  })


}

export default exampleAcceptanceTest
