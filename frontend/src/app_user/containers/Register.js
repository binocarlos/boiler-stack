import React, { Component, PropTypes } from 'react'

import formfields from '../config/formfields'
import selectors from '../selectors'
import actions from '../actions'

import FormContainer from '../../boiler-ui/lib/containers/Form'
import Register from '../components/Register'

class RegisterContainer extends Component {

  render() {

    return (
      <FormContainer
        formComponent={ Register }
        getFields={ formfields.register }
        selector={ selectors.user.register.form }
        actions={ actions.user.register.form }
      />
    )
    
  }
}

export default RegisterContainer