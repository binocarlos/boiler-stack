import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import { routerForBrowser } from 'redux-little-router'

const configureStore = ({ initialState = {}, reducer, middleware = [], routes = {}, extraComposeArgs = [] }) => {

  const sagaMiddleware = createSagaMiddleware()
  middleware = [
    sagaMiddleware
  ].concat(middleware)

  const {
    routerEnhancer,
    routerMiddleware  
  } = routerForBrowser({
    routes
  })

  const store = createStore(
    reducer,
    initialState,
    compose.apply(null, [
      routerEnhancer,
      applyMiddleware.apply(null, [routerMiddleware].concat(middleware))
    ].concat(extraComposeArgs))
  )

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)
  return store
}

export default configureStore