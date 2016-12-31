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
  return store
}