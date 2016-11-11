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
          <Link to="/clients">Clients</Link>
        </p>
        <p>
          <Link to="/resources">Resources</Link>
        </p>
        <p>
          <Link to="/templates">Templates</Link>
        </p>
        <p>
          <Link to="/quotes">Quotes</Link>
        </p>
      </div>
    )
  }

}

export default Dashboard