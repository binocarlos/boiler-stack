import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
class Dashboard extends Component {

  render() {

    return (
      <div>
        <p>
          This is the admin dashboard
        </p>
        <p>
          <Link to="/resources/core">Core Resources</Link>
        </p>
        <p>
          <Link to="/users">Users</Link>
        </p>
      </div>
    )
  }

}

export default Dashboard