import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

export default class Root extends Component {
  render() {
    const { store, history, routes, type, renderProps } = this.props

    return (
      <Provider store={store}>
        <MuiThemeProvider>
          { type === 'server'
            ? <RouterContext {...renderProps} />
            : <Router history={history} routes={routes} />
          }
        </MuiThemeProvider>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.node.isRequired
}