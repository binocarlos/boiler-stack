import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Users from '../components/Users'

export class UsersContainer extends Component {
  render() {
    return (
      <Users {...this.props} />
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
)(UsersContainer)
