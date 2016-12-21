import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Page from '../../kettle-ui/lib/Page'

class About extends Component {

  render() {

    return (
      <Page>
        <p>
          This is the about page 2
        </p>
        <p>
          <Link to="/">Go Home</Link>
        </p>
      </Page>
    )
  }

}

export default About