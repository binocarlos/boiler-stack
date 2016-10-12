import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
class About extends Component {

  render() {

    return (
      <div>
        <p>
          This is the about page
        </p>
        <p>
          <Link to="/">Go Home</Link>
        </p>
      </div>
    )
  }

}

export default About