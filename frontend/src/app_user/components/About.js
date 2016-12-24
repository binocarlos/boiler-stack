import React, { Component, PropTypes } from 'react'
import { Link } from 'redux-little-router'

class About extends Component {

  render() {

    return (
      <div>
        this is the about page
        <p>
          <Link href="/">Dashboard</Link>
        </p>
      </div>
    )
  }

}

export default About