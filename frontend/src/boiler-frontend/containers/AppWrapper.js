import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'

import UIAppWrapper from 'kettle-ui/lib/AppWrapper'
import AppBar from '../components/AppBar'
import Drawer from '../components/Drawer'

import {
  toggle_menu
} from '../actions'

export class AppWrapperContainer extends Component {
  render() {
    const AppBarComponent = this.props.appbarComponent

    if(!AppBarComponent) throw new Error('AppBarComponent prop needed')
    const appbarContent = this.props.getAppbarContent(this.props.state, this.props.dispatch)
    const menuContent = this.props.getMenuContent(this.props.state, this.props.dispatch)

    const appbar = (
      <AppBarComponent 
        hasMenu={this.props.hasMenu}
        title={this.props.title}
        changeLocation={this.props.changeLocation}
        toggleMenu={this.props.toggleMenu}
        titlebarClickUrl={this.props.titlebarClickUrl}
        >
        {appbarContent}
      </AppBarComponent>
    )

    const sidemenu = this.props.hasMenu ? (
      <Drawer 
        isMenuOpen={this.props.isMenuOpen}
        toggleMenu={this.props.toggleMenu}
        >
          {menuContent}
      </Drawer>
    ) : null

    const app = ( 
      <UIAppWrapper
        appbar={appbar}
      >
        <div>
          <div>
            {this.props.children}
          </div>
          <div>
            {sidemenu}
          </div>
        </div>
      </UIAppWrapper>
    )

    const loading = (
      <div>loading...</div>
    )

    return this.props.ready ? app : loading
  }
}

function mapStateToProps(state, ownProps) {
  const settings = ownProps.route.settings
  return {
    state:state,
    appbarComponent:settings.appbarComponent,
    title:settings.getTitle(state),
    ready:settings.isReady(state),
    getAppbarContent:settings.getAppbarContent,
    getMenuContent:settings.getMenuContent,
    hasMenu:settings.hasMenu,
    isMenuOpen:state.boiler.isMenuOpen
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const settings = ownProps.route.settings
  return {
    dispatch:dispatch,
    changeLocation:(path) => {
      dispatch(routerActions.push(path))
    },
    toggleMenu:(open) => {
      dispatch(toggle_menu(open))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppWrapperContainer)
