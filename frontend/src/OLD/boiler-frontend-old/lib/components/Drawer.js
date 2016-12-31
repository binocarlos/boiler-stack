import React, { Component, PropTypes } from 'react'
import Drawer from 'material-ui/Drawer'

export class SideMenu extends Component {
  render() {
    return (
      <Drawer 
        docked={false}
        width={200}
        open={this.props.isMenuOpen}
        onRequestChange={this.props.toggleMenu}>
        <div>
          {this.props.children}
        </div>
      </Drawer>
    )
  }
}

export default SideMenu