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
          <Link to="/folders">Click here</Link> for the folder app
        </p>
      </div>
    )
  }

}

export default Dashboard