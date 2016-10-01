import React, { Component, PropTypes } from 'react'
import AppWrapper from 'kettle-ui/lib/AppWrapper'
import AppBar from 'material-ui/AppBar'
import { UserSwitch } from 'passport-service-gui'
import App from './App'
import Login from './Login'

class Wrapper extends Component {

  render() {

    return (
      <UserSwitch 
        url="/v1/auth/status" 
        children={this.props.children}
        userview={App}
        guestview={Login} />
    )
  }

}

export default Wrapper