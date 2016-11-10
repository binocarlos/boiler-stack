import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
class Dashboard extends Component {

  render() {

    return (
      <div>
        <p>
          This is the dashboard
        </p>
        <p>
          <Link to="/about">About</Link>
        </p>
        <p>
          <Link to="/projects">Projects</Link>
        </p>
        <p>
          <Link to="/resources">Resources</Link>
        </p>
      </div>
    )
  }

}

export default Dashboard