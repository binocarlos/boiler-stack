import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class LocationFilter extends Component {
  render() {
    return this.props.filter(this.props.router.pathname) ?
      this.props.children :
      null
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

LocationFilter.propTypes = {
  filter: PropTypes.func.isRequired
}

LocationFilter.defaultProps = {
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationFilter)