import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  absolutePath,
  relativePath
} from '../tools'

class ScreensContainer extends Component {
  render() {
    const absolute = absolutePath(this.props.basepath)
    const relative = relativePath(this.props.basepath)

    return this.props.getFragments(relative, absolute)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    router: state.router
  }
}

const mapDispatchToProps = (state, ownProps) => {
  return {}
}

ScreensContainer.propTypes = {
  basepath: PropTypes.string.isRequired,
  getFragments: PropTypes.func.isRequired
}

ScreensContainer.defaultProps = {
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreensContainer)