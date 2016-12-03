import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import AppBar from '../components/AppBar'

import {
  toggle_menu
} from '../actions'

export class AppBarContainer extends Component {
  render() {
    return (
      <AppBar {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const user = ownProps.settings.getUser(state)
  const title = ownProps.settings.getTitle(user)
  const openAccess = ownProps.settings.openAccess
  return {
    user,
    title,
    state,
    openAccess,
    isMenuOpen:state.boiler.isMenuOpen,
    getMenu:ownProps.settings.getMenu
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    changeLocation:(path) => {
      dispatch(routerActions.push(path))
    },
    toggleMenu:(open) => {
      dispatch(toggle_menu(open))
    },
    doLogout:(url) => {
      console.log('logout')
      return
      
      // ping the logout endpoint
      //dispatch(actions.logout(url, (err, body, opts) => {
        // clear existing passport state
        //dispatch(actions.resetStatus())

        // redirect to '/'
        //dispatch(routerActions.push(constants.loginPath))
      //}))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBarContainer)
