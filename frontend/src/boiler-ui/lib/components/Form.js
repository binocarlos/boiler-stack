import React, { Component, PropTypes } from 'react'
import { Card, CardText } from 'react-toolbox/lib/card'

import Page from './Page'
import FormFields from './FormFields'

class Form extends Component {

  render() {
    return (
      <Page>
        <Card>
          <CardText>
            <FormFields
              fields={this.props.fields}
              update={this.props.update}
              touch={this.props.touch}
            />
          </CardText>          
        </Card>
      </Page>
    )
  }

}

export default Form