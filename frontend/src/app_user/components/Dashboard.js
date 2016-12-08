import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Page from 'kettle-ui/lib/Page'

class Dashboard extends Component {

  render() {

    return (
      <Page>
        <p>
          This is the dashboard
        </p>
        <p>
          <Link to="/about">About</Link>
        </p>
        <p>
          <Link to="/accounts">Accounts</Link>
        </p>
        <p>
          <Link to="/projects">Projects</Link>
        </p>
        <p>
          <Link to="/resources">Resources</Link>
        </p>
        <p>
          <Link to="/clients">Clients</Link>
        </p>
        <p>
          <Link to="/quotes">Quotes</Link>
        </p>
      </Page>
    )
  }

}

export default Dashboard