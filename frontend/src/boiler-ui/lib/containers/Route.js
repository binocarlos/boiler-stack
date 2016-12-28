import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { RelativeFragment as Fragment } from 'redux-little-router'

class Route extends Component {
  render() {
    return this.props.filter(this.props.router.pathname) ?
      this.props.children :
      null
  }
}

const mapStateToProps = (state, ownProps) => {
  const userSelector = ownProps.userSelector || (state) => state.user
  const routerSelector = ownProps.routerSelector || (state) => state.router
  return {
    router: state.router
  }
}

const mapDispatchToProps = (state, ownProps) => {
  return {}
}

LocationFilter.propTypes = {
  selector: PropTypes.func,
  guest: PropTypes.bool
}

LocationFilter.defaultProps = {
  userSelector: (state) => state.user,
  routerSelector: (state) => state.router,
  guest: false
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Route)