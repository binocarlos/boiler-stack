if (process.env.NODE_ENV === 'production') {
  module.exports = require('./messages.prod')
} else {
  module.exports = require('./messages.dev')
}