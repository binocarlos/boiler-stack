import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { user } from '../selectors'

import Dashboard from '../components/Dashboard'
import Welcome from '../components/Welcome'

class Home extends Component {
  render() {

    return this.props.loggedIn ?
      <Dashboard /> :
      <Welcome />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    loggedIn: user.status.loggedIn(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)