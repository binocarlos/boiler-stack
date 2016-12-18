import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  currentInstallation
} from '../selectors'

export class ActiveInstallationWrapper extends Component {
  render() {
    if(!this.props.currentInstallation) return null
    if(this.props.id != this.props.currentInstallation) return null
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    currentInstallation:currentInstallation(state)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveInstallationWrapper)
