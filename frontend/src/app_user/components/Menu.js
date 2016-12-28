import React, { Component, PropTypes } from 'react'
import BaseMenu from '../../boiler-ui/lib/components/Menu'

import {
  user as userMenu,
  guest as guestMenu
} from '../config/menu'

export class GuestMenu extends Component {
  render() {
    return (
      <BaseMenu 
        items={guestMenu}
        redirect={this.props.redirect}
        ripple={this.props.ripple}
      />
    )
  }
}

export class UserMenu extends Component {
  render() {
    return (
      <BaseMenu 
        items={userMenu}
        redirect={this.props.redirect}
        ripple={this.props.ripple}
      />
    )
  }
}