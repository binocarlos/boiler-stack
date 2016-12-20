import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'

export default function configureStore(rootReducer, middleware, initialState) {
  const sagaMiddleware = createSagaMiddleware()
  middleware = [
    sagaMiddleware
  ].concat(middleware)

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