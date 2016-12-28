import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import AppBar from 'react-toolbox/lib/app_bar'
import { IconButton } from 'react-toolbox/lib/button'
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox/lib/layout'

import core from '../config/core'
import selectors from '../selectors'
import actions from '../actions'

import Menu from '../components/Menu'

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
    return (
      <Layout>
        <NavDrawer 
          active={ this.props.menuOpen }
          onOverlayClick={ this.props.closeMenu }>
          <Menu 
            loggedIn={ this.props.loggedIn }
            onClick={ this.props.closeMenu }
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
    menuOpen: state.menu.open,
    loggedIn: selectors.user.status.loggedIn(state),
    userLoaded: selectors.user.status.loaded(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openMenu: () => dispatch(actions.menu.open()),
    closeMenu: () => dispatch(actions.menu.close())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper)