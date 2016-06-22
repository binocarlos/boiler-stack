import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import { Provider } from 'react-redux'

import App from "./containers/App";
import Library from "./containers/Library";
import Projects from "./containers/Projects"
import AccountDetails from "./components/AccountDetails"
import Help from "./components/Help"
import Dashboard from "./components/Dashboard"

function getRoutes(store, history){
  return (
    <Provider store={store}>
      <div id="appwrapper">
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Dashboard} />
            <Route path="projects" component={Projects} />
            <Route path="library" component={Library} />
            <Route path="accountdetails" component={AccountDetails} />
            <Route path="help" component={Help} />
          </Route>
        </Router>
      </div>
    </Provider>
  )
}

export default getRoutes
