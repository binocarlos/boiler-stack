import React, { Component, PropTypes } from 'react'

import formfields from '../config/formfields'
import selectors from '../selectors'
import actions from '../actions'

import FormContainer from '../../boiler-ui/lib/containers/Form'
import Login from '../components/Login'

class LoginContainer extends Component {

  render() {

    return (
      <FormContainer
        formComponent={ Login }
        getFields={ formfields.login }
        selector={ selectors.user.login.form }
        actions={ actions.user.login.form }
      />
    )
    
  }
}

export default LoginContainer