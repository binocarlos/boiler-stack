import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Welcome from '../components/Welcome'

class WelcomeContainer extends Component {
  render() {
    return (
      <Welcome {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeContainer)