import React, { Component, PropTypes } from 'react'
import { Link } from 'redux-little-router'

class Help extends Component {

  render() {

    return (
      <div>
        this is the help page
        <p>
          <Link href="/app">Dashboard</Link>
        </p>
      </div>
    )
  }

}

export default Help