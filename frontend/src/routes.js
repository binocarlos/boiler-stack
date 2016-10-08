import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { tools } from 'passport-service-gui'

import LoginWrapper from './containers/LoginWrapper'
import Loader from './components/Loader'

export class Routes extends Component {
  render() {
    return (
      <Router history={this.props.history}>
        <Route path="/" component={LoginWrapper}>
          <IndexRoute component={Loader} />
          <Route path="*" component={Loader} />
        </Route>
      </Router>
    )
  }
}

function mapStateToProps(state, ownProps) {

  // load the user status from the passport-serivce-gui reducer
  return {
    passport:tools.getUser(state)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loaduser:function(){
      dispatch(status(ownProps.url))
    }
  }
}

export default Routes
/*
connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes)
*/