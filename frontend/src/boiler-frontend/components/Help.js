import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
class Dashboard extends Component {

  render() {

    return (
      <div>
        <p>
          This is the help page
        </p>
        <p>
          <Link to="/">Go Home</Link>
        </p>
      </div>
    )
  }

}

export default Dashboard