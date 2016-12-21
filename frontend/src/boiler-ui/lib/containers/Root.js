import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

class Root extends Component {
  render() {
    const { store, history, routes, type, renderProps } = this.props

    return (
      <Provider store={store}>
          { type === 'server'
            ? <RouterContext {...renderProps} />
            : <Router history={history} routes={routes} />
          }
      </Provider>
    )
  }
}

export default Root