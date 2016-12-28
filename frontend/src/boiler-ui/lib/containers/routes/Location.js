import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { mapStateToProps } from './tools'

class Location extends Component {
  render() {

    const filterOK = this.props.filter ?
      this.props.filter(this.props.router.pathname) :
      true

    const userOK = typeof(this.props.user) == 'boolean' ?
      this.props.user == this.props.loggedIn :
      true

    return filterOK && userOK ?
      this.props.children :
      (<div></div>)
  }
}

const mapDispatchToProps = (state, ownProps) => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Location)