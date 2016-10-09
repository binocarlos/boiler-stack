import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Routes from './routes'

import folderreducer from 'folder-ui/lib/reducer'
import { passportreducer, UserLoader } from 'passport-service-gui'

const finalCreateStore = compose(
  applyMiddleware(thunk, routerMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const reducer = combineReducers({
  folderui: folderreducer,
  passport: passportreducer,
  routing: routerReducer
})

const store = finalCreateStore(reducer)
const history = syncHistoryWithStore(hashHistory, store)
const routes = Routes(store)

injectTapEventPlugin()

ReactDOM.render(  
  <Provider store={store}>
    <MuiThemeProvider>
      <UserLoader url="/v1/auth/status">
        <Router history={history}>
          {routes}
        </Router>
      </UserLoader>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('mount')
)