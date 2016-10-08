import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'
import { hashHistory } from 'react-router'
import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Routes from './routes'

import folderreducer from 'folder-ui/lib/reducer'
import { passportreducer, UserLoader } from 'passport-service-gui'

const finalCreateStore = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

const reducer = combineReducers({
  folderui: folderreducer,
  passport: passportreducer,
  routing: routerReducer
})

const store = finalCreateStore(reducer)

const history = syncHistoryWithStore(hashHistory, store)

injectTapEventPlugin()

ReactDOM.render(  
  <Provider store={store}>
    <MuiThemeProvider>
      <UserLoader>
        <Routes history={history} />
      </UserLoader>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('mount')
)