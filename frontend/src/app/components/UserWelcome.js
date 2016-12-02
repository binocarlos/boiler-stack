import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import Welcome from './Welcome'

class UserWelcome extends Component {

  render() {

    return (
      <Welcome>
        <div>
          <p>
            <Link to="/login">Click here</Link> to login
          </p>
          <p>
            <Link to="/register">Click here</Link> to register
          </p>
        </div>
      </Welcome>
    )
  }

}

export default UserWelcome