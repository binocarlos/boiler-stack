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
            <Link to="/login">Click here</Link> to login
          </p>
          <p>
            <Link to="/register">Click here</Link> to register
          </p>
        </div>
      </Page>
    )
  }

}

export default UserWelcome