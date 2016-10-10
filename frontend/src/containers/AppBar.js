import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { passporttools } from 'passport-service-gui'
import UIAppBar from '../components/AppBar'

export class AppBar extends Component {
  render() {
    return (    
      <UIAppBar {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const passport = passporttools.getUser(state)
  let title = passport.loggedIn ? 'App' : 'Login / Register'
  title = passport.loaded ? title : ''
  return {  
    passport,
    title:title
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBar)
