import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Page from 'kettle-ui/lib/Page'

class Dashboard extends Component {

  render() {

    return (
      <Page>
        <p>
          This is the help page
        </p>
        <p>
          <Link to="/">Go Home</Link>
        </p>
      </Page>
    )
  }

}

export default Dashboard