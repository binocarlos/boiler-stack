import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Page from 'kettle-ui/lib/Page'

class UserWelcome extends Component {

  render() {

    return (
      <Page>
        <div>
          <p>
            Welcome!
          </p>
          <p>
            <a href="/auth/v1/logout?redirect=/app">Click here</a> to logout
          </p>
        </div>
      </Page>
    )
  }

}

export default UserWelcome