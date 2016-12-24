import React, { Component, PropTypes } from 'react'
import { Link } from 'redux-little-router'
import Page from '../../boiler-ui/lib/components/Page'

class Dashboard extends Component {

  render() {

    return (
      <Page>
        this is the dashboard page
        <p>
          <Link href="/help">Help</Link>
        </p>
        <p>
          <Link href="/about">About</Link>
        </p>
      </Page>
    )
  }

}

export default Dashboard