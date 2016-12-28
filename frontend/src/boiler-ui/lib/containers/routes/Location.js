import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { getUserState } from '../../tools'

class Location extends Component {
  render() {
    const filterOK = this.props.filter ?
      this.props.filter(this.props.router.pathname) :
      true
    return filterOK ?
      this.props.children :
      (<div></div>)
  }
}

export default connect(
  getUserState
)(Location)