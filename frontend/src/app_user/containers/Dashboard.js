import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Dashboard from '../components/Dashboard'

class DashboardContainer extends Component {
  render() {
    return (
      <Dashboard {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer)