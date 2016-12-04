import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import AppWrapper from '../components/AppWrapper'

export class AppWrapperContainer extends Component {
  render() {
    return (
      <AppWrapper {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const settings = ownProps.route.settings
  return {
    isReady:settings.isReady(state)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapperContainer)
