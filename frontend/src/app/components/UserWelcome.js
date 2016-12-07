import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Page from 'kettle-ui/lib/Page'

class UserWelcome extends Component {

  render() {

    const settings = this.props.route.settings

    return (
      <Page>
        <div>
          <p>
            Welcome!
          </p>
          <p>
            <a href={settings.fullLogoutPath}>Click here</a> to logout
          </p>
        </div>
      </Page>
    )
  }

}

export default UserWelcome