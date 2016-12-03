import React, { Component, PropTypes } from 'react'
import UIAppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'

import UserMenu from './UserMenu'

export class AppBar extends Component {

  render() {

    // the menu content is React Elements that will appear in the right hand drawer
    const menuContent = this.props.getMenu ?
      this.props.getMenu(this.props.user, this.props.state, (location) => {
        this.props.changeLocation(location)
        this.props.toggleMenu(false)
      }) :
      null

    // if we are logged we get a drop-down
    // other-wise it's a link to the login button
    const rightMenuIcon = (
      <UserMenu {...this.props} />
    )

    // give the user a chance to wrap the right-hand icon
    // with their own-contnt
    const iconElementRight = this.props.getAppBarChildren ?
      this.props.getAppBarChildren(rightMenuIcon) :
      rightMenuIcon
      
    return (
      <div>
        {
          menuContent ?
            (
              <Drawer 
                docked={false}
                width={200}
                open={this.props.isMenuOpen}
                onRequestChange={this.props.toggleMenu}>
                {menuContent}
              </Drawer>
            ) : null
        }
        <UIAppBar
          showMenuIconButton={menuContent ? true : false}
          title={this.props.title}
          iconElementRight={iconElementRight}
          onTitleTouchTap={() => this.props.changeLocation('/')}
          onLeftIconButtonTouchTap={() => this.props.toggleMenu(true)}
          titleStyle={{cursor:'pointer'}}
          zDepth={2} />
      </div>
    )
  }
}

export default AppBar