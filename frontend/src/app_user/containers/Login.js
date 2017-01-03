import React, { Component, PropTypes } from 'react'

import formfields from '../config/formfields'
import plugins from '../plugins'

import FormContainer from '../../boiler-ui/lib/containers/Form'
import Login from '../components/Login'

class LoginContainer extends Component {

  render() {

    return (
      <FormContainer
        formComponent={ Login }
        getFields={ formfields.login }
        selector={ plugins.user.selectors.login.form }
        actions={ plugins.user.actions.login.form }
      />
    )
    
  }
}

export default LoginContainer