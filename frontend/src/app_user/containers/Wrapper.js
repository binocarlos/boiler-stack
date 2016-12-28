import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import AppBar from 'react-toolbox/lib/app_bar'
import { IconButton } from 'react-toolbox/lib/button'
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox/lib/layout'

import UserFilter from '../../boiler-ui/lib/containers/routes/UserFilter'

import routerActions from '../../boiler-ui/lib/actions/router'

import core from '../config/core'
import selectors from '../selectors'
import actions from '../actions'

import {
  menu as menuSelector,
  user as userSelector
} from '../selectors'

import {
  GuestMenu,
  UserMenu
} from '../components/Menu'

class Wrapper extends Component {

  loadingWrapper() {
    return (
      <Layout>
        <Panel>
          <AppBar
            title={ core.title }
            leftIcon="menu"
          />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            
          </div>
        </Panel>
      </Layout>
    )
  }

  fullWrapper() {
    const menuRedirect = (path) => {
      this.props.redirect(path)
      this.props.closeMenu()
    }
    return (
      <Layout>
        <NavDrawer 
          active={ this.props.isMenuOpen }
          onOverlayClick={ this.props.closeMenu }
        >

          <UserFilter
            user={UserMenu}
            guest={GuestMenu}
            componentProps={{
              redirect: menuRedirect
            }}
          />

        </NavDrawer>
        <Panel>
          <AppBar
            title={ core.title }
            leftIcon="menu"
            onLeftIconClick={ this.props.openMenu }
          />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            { this.props.children }
          </div>
        </Panel>
      </Layout>
    )
  }
  
  render() {
    return this.props.userLoaded ?
      this.fullWrapper() :
      this.loadingWrapper()
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    router: state.router,
    isMenuOpen: menuSelector.open(state),
    loggedIn: userSelector.status.loggedIn(state),
    userLoaded: userSelector.status.loaded(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openMenu: () => dispatch(actions.menu.open()),
    closeMenu: () => dispatch(actions.menu.close()),
    redirect: (path) => dispatch(routerActions.push(path))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper)