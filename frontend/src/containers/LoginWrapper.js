import React, { Component, PropTypes } from 'react'
import Wrapper from '../components/Wrapper'

class LoginWrapper extends Component {

  render() {

    return (
      <Wrapper
        title="Login/Register">
        
        {this.props.children}
        
      </Wrapper>
    )
  }

}

export default LoginWrapper