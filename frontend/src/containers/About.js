import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import UIAbout from '../components/About'

export class About extends Component {
  render() {
    return (
      <UIAbout {...this.props} />
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
)(About)
