import React, { Component, PropTypes } from 'react'
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list'
import { Link } from 'redux-little-router'

import { URLS } from '../apis'
import icons from '../config/icons'

const getItem = (title, icon, handler) => {
  return (
    <ListItem 
      key={title} 
      caption={title} 
      leftIcon={icon} 
      onClick={handler}
    />
  )
}

export class GuestMenu extends Component {
  render() {
    const redirect = (path) => () => this.props.redirect(path)
    return (
      <List selectable ripple>
        {this.props.hideHome ? (<div></div>) : getItem('Home', icons.home, redirect('/'))}
        {getItem('Login', icons.login, redirect('/login'))}
        {getItem('Register', icons.register, redirect('/register'))}
        {getItem('Help', icons.help, redirect('/help'))}
        {getItem('About', icons.about, redirect('/about'))}
      </List>
    )
  }
}

export class UserMenu extends Component {
  render() {
    const redirect = (path) => () => this.props.redirect(path)
    return (
      <List selectable ripple>
        {this.props.hideHome ? (<div></div>) : getItem('Dashboard', icons.dashboard, redirect('/'))}
        {getItem('Help', icons.help, redirect('/help'))}
        {getItem('About', icons.about, redirect('/about'))}
        {getItem('Logout', icons.logout, () => {
          document.location = URLS.user.logout
        })}
      </List>
    )
  }
}