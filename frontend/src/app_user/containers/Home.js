import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { user } from '../selectors'

import Dashboard from './Dashboard'
import Welcome from './Welcome'

class Home extends Component {
  render() {

    return this.props.loggedIn ?
      <Dashboard /> :
      <Welcome />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: user.loggedIn(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)