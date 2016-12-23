import createLogger from 'redux-logger'
import factory from './factory'

const configureStore = ({ initialState = {}, reducer, middleware = [], routes = {} }) => {
  return factory({
    initialState,
    reducer,
    routes,
    middleware: middleware.concat([
      createLogger({
        collapsed:true
      })
    ]),
    extraComposeArgs: [
      window.devToolsExtension ? window.devToolsExtension() : f => f
    ]
  })
}

export default configureStore