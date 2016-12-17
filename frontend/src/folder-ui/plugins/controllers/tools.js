import parallelLimit from 'async/parallelLimit'

// return a proimse that wraps a parallelLimit for api queries
// you pass a handler and an array of objects with:
//   * query
//   * data
export const multiApi = (handler, list = [], opts = {}) => {
  return new Promise((resolve, reject) => {
    parallelLimit(list.map(item => {
      return (next) => {
        handler(item.query, item.data)
          .then(result => next(null, result))
          .catch(err => next(err))
      }
    }), opts.deleteConcurrency || 5, (err, results) => {
      if(err) return reject(err.toString())
      resolve(results)
    })
  })
}