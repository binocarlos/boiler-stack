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
          <Link to="/resources">Resources</Link>
        </p>
        <p>
          <Link to="/templates">Templates</Link>
        </p>
        <p>
          <Link to="/gangs">Gangs</Link>
        </p>
        <p>
          <Link to="/users">Users</Link>
        </p>
      </div>
    )
  }

}

export default Dashboard