import React, { Component, PropTypes } from 'react'
import { Link } from 'redux-little-router'
import Page from '../../boiler-ui/lib/components/Page'
import FormFields from '../../boiler-ui/lib/components/FormFields'
import TextField from '../../boiler-ui/lib/components/formfields/Text'

const FIELDS = [{
  name: 'email',
  component: TextField,
  title: 'Email',
  value: ''
},{
  name: 'password',
  component: TextField,
  title: 'Password',
  value: ''
}]

class Login extends Component {

  render() {

    return (
      <Page>
        this is the login page
        <hr />
        <FormFields
          fields={FIELDS}
          update={(v) => console.log(v)}
        />
      </Page>
    )
  }

}

export default Login