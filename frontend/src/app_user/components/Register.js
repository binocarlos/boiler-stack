import React, { Component, PropTypes } from 'react'
import { Link } from 'redux-little-router'
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'
import { Button } from 'react-toolbox/lib/button'

import Page from '../../boiler-ui/lib/components/Page'
import FormFields from '../../boiler-ui/lib/components/FormFields'

class Register extends Component {

  render() {
    return (
      <Page>
        <Card>
          <CardTitle
            title="Register"
            subtitle={(
              <span>
                Enter your details to create a new account
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

export default Register