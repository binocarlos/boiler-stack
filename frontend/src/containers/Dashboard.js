import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import UIDashboard from '../components/Dashboard'

export class Dashboard extends Component {
  render() {
    return (
      <UIDashboard {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {}
}

function mapDispatchToProps(dispatch, ownProps) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
