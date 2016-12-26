// test to see that we can connect to the router
import Tape from 'tape'
import axios from 'axios'

const tape = (name, handler) => Tape('acceptance -> network' + name, handler)

const networkAcceptanceTest = (opts = {}) => {
  
  tape(' -> check network', t => {
    axios.get('http://router/')
    .then(function (response) {
      t.equal(response.status, 200, '200 response code')
      t.end()
    })
    .catch(function (error) {
      t.error(error)
      t.end()
    })
  })

}

export default networkAcceptanceTest
