import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import createLogger from 'redux-logger'

export default function configureStore(rootReducer, middleware, initialState) {

  const logger = createLogger({
    collapsed:true
  })
  const sagaMiddleware = createSagaMiddleware()
  middleware = [
    sagaMiddleware
  ].concat(middleware).concat(localStorage.debug !== undefined ? [logger] : [])

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware.apply(null, middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)

  if(process.env.NODE_ENV == 'development') {
    console.log('-------------------------------------------')
    console.log('-------------------------------------------')
    console.log('DEVELOPMENT MODE')
    console.log('to activate logging - enter the following into the console and reload:')
    console.log('')
    console.log(' > localStorage.debug = true')
    console.log('')
    console.log('to disable logs:')
    console.log('')
    console.log(' > delete localStorage.debug')
    console.log('-------------------------------------------')
    console.log('-------------------------------------------')
  }

  return store
}