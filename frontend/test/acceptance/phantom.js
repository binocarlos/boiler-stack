// test to see that our phantomjs setup is good
import Tape from 'tape'
import Horseman from 'node-horseman'

const tape = (name, handler) => Tape('acceptance -> phantomjs' + name, handler)

const phantomAcceptanceTest = (opts = {}) => {
  
  tape('', t => {
    t.equal(10, 10, 'sanity')

    var horseman = new Horseman()

    horseman
      .open('http://router/')
      .status()
      .then((code) => {
        t.equal(code, 200, '200 response code')
        t.end()
        return horseman.close()
      })
      .close()
  })

}

export default phantomAcceptanceTest
