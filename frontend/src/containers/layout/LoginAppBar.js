import React, { Component, PropTypes } from 'react'
import AppBar from 'material-ui/AppBar'

class LoginAppBar extends Component {

  render() {

    return (
      <AppBar
        showMenuIconButton={false}
        title="Login/Register"
        zDepth={2} />
    )
  }

}

export default LoginAppBar