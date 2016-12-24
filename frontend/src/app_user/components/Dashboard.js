import React, { Component, PropTypes } from 'react'
import { Link } from 'redux-little-router'

class Dashboard extends Component {

  render() {

    return (
      <div>
        this is the dashboard page
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

export default Dashboard