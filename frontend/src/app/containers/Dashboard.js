import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Dashboard from '../components/Dashboard'

export class DashboardContainer extends Component {
  render() {
    return (
      <Dashboard {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    gotoPage:(path) => {
      dispatch(push(path))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardContainer)
