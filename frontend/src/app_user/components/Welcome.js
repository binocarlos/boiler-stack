import React, { Component, PropTypes } from 'react'
import { Link } from 'redux-little-router'
import Page from '../../boiler-ui/lib/components/Page'

class Welcome extends Component {

  render() {

    return (
      <Page>
        Welcome
        <p>
          <Link href="/login">Login</Link>
        </p>
        <p>
          <Link href="/register">Register</Link>
        </p>
      </Page>
    )
  }

}

export default Welcome