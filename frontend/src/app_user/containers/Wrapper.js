import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Layout, NavDrawer, Panel } from 'react-toolbox/lib/layout'
import AppBar from 'react-toolbox/lib/app_bar'

import routerActions from '../../boiler-ui/lib/actions/router'

import core from '../config/core'
import selectors from '../selectors'
import actions from '../actions'

import {
  menu as menuSelector,
  user as userSelector
} from '../selectors'

import Menu from '../components/Menu'
import AppBarMenu from '../components/AppBarMenu'

class Wrapper extends Component {

  loadingWrapper() {
    return (
      <Layout>
        <Panel>
          <AppBar
            title={ this.props.pageTitle }
            leftIcon="menu"
          />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            loading...
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
        
        <Menu
          isOpen={ this.props.isMenuOpen }
          close={ this.props.closeMenu }
          redirect={ menuRedirect }
        />
        
        <Panel>
          <AppBar
            title={ this.props.pageTitle }
            leftIcon="menu"
            onLeftIconClick={ this.props.openMenu }
          >
            <AppBarMenu />
          </AppBar>
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
  const page = state.router.result || {}
  const pageTitle = core.title + (
    page.title ? 
      ' : ' + page.title :
      ''
  )
  return {
    router: state.router,
    pageTitle,
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