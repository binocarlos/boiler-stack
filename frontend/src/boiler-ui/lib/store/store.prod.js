import factory from './factory'

const configureStore = (opts = {}) => {
  return factory(opts)
}

export default configureStore