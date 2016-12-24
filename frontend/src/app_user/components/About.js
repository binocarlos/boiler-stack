import React, { Component, PropTypes } from 'react'
import { Link } from 'redux-little-router'
import Page from '../../boiler-ui/lib/components/Page'

class About extends Component {

  render() {

    return (
      <Page>
        this is the about page
        <p>
          <Link href="/">Dashboard</Link>
        </p>
      </Page>
    )
  }

}

export default About