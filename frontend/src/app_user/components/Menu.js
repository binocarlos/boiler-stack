import React, { Component, PropTypes } from 'react'
import { Link } from 'redux-little-router'

class Menu extends Component {

  render() {

    return (
      <div>
        <p>
          <Link href="/">Dashboard</Link>
        </p>
        <p>
          <Link href="/help">Help</Link>
        </p>
        <p>
          <Link href="/about">About</Link>
        </p>
      </div>
    )
  }

}

export default Menu