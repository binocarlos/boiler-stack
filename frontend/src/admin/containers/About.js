import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import About from '../components/About'

export class AboutContainer extends Component {
  render() {
    return (
      <About {...this.props} />
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
)(AboutContainer)
