import React, { Component, PropTypes } from 'react'
import { Link } from 'redux-little-router'
import { Card, CardTitle, CardText } from 'react-toolbox/lib/card'

import Page from '../../boiler-ui/lib/components/Page'
import FormFields from '../../boiler-ui/lib/containers/FormFields'

import formfields from '../config/formfields'

import { login } from '../selectors'
import actions from '../actions'

class Login extends Component {

  render() {
    return (
      <Page>
        <Card>
          <CardTitle
            title="Login"
            subtitle="Enter your email and password"
          />
          <CardText>
            <FormFields
              getFields={() => formfields.login()}
              selector={login.form}
              updateAction={actions.user.login.form.update}
              touchAction={actions.user.login.form.touch}
            />
          </CardText>
        </Card>
      </Page>
    )
  }

}

export default Login