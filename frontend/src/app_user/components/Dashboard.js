import React, { Component, PropTypes } from 'react'
import { Link } from 'redux-little-router'
import Page from '../../boiler-ui/lib/components/Page'

import { UserMenu } from './Menu'

class Dashboard extends Component {

  render() {

    return (
      <Page>
        <p>Dashboard</p>
        <UserMenu 
          hideHome={true} 
          ripple={false} 
          redirect={this.props.redirect}
        />
      </Page>
    )
  }

}

export default Dashboard