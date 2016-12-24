import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import AppBar from 'react-toolbox/lib/app_bar'
import { IconButton } from 'react-toolbox/lib/button'
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox/lib/layout'

import core from '../config/core'
import actions from '../actions'

import Menu from '../components/Menu'

class Wrapper extends Component {
  render() {
    return (
      <Layout>
        <NavDrawer 
          pinned={false} permanentAt='xxxl'
          active={this.props.menuOpen}
          onOverlayClick={ this.props.closeMenu }>
          <Menu />
        </NavDrawer>
        <Panel>
          <AppBar
            title={core.title}
            leftIcon="menu"
            onLeftIconClick={this.props.openMenu}
          />
          <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
            {this.props.children}
          </div>
        </Panel>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    router: state.router,
    menuOpen: state.menu.open
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