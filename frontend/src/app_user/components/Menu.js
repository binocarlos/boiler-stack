import React, { Component, PropTypes } from 'react'
import { Link } from 'redux-little-router'

import {
  guestMenu,
  userMenu
} from '../config/menu'

class Menu extends Component {

  render() {

    const menuDescs = this.props.user ?
      userMenu(this.props.user) :
      guestMenu()

    return (
      <div>
      {
        menuDescs.map((item, i) => {
          return (
            <p key={i}>
              <Link href={ item.href } onClick={ this.props.onClick }>
                { item.title }
              </Link>
            </p>
          )
        })
      }
      </div>
    )
  }

}

Menu.propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func
}

export default Menu