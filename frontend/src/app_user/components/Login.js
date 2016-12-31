import React, { Component, PropTypes } from 'react'
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'

import Page from '../../boiler-ui/lib/components/Page'
import FormFields from '../../boiler-ui/lib/components/FormFields'

import Link from './Link'

class Login extends Component {

  render() {
    return (
      <Page>
        <Card>
          <CardTitle
            title="Login"
            subtitle={(
              <span>
                Enter your email and password to login - <Link href="/register">click here</Link> to create an account
              </span>
            )}
          />
          <CardText>
            <FormFields
              fields={this.props.fields}
              update={this.props.update}
              touch={this.props.touch}
            />
          </CardText>
          <CardActions>
            <Button 
              label="Cancel" 
              onClick={() => this.props.redirect('/app')}
            />
            <Button 
              label="Submit" 
              raised={this.props.valid} 
              primary={this.props.valid}
              onClick={() => this.props.submit(this.props.valid)}
            />
          </CardActions>
        </Card>
      </Page>
    )
  }

}

export default Login