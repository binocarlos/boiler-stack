import React, { Component, PropTypes } from 'react'
import { Link } from 'redux-little-router'

class Menu extends Component {

  getLink(href, title) {
    return (
      <p>
        <Link href={ href } onClick={ this.props.onClick }>
          { title }
        </Link>
      </p>
    )
  }

  getGuestMenu() {
    return (
      <div>
        {this.getLink('/', 'Home')}
        {this.getLink('/login', 'Login')}
        {this.getLink('/register', 'Register')}
      </div>
    )
  }

  getUserMenu() {
    return (
      <div>
        {this.getLink('/', 'Dashboard')}
        {this.getLink('/help', 'Help')}
        {this.getLink('/about', 'About')}
      </div>
    )
  }

  render() {
    return this.props.loggedIn ?
      this.getUserMenu() :
      this.getGuestMenu()
  }

}

Menu.propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func
}

export default Menu