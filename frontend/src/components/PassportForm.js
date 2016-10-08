import React, { PropTypes, Component } from 'react'
import Paper from 'material-ui/Paper'
import { PassportForm } from 'passport-service-gui'

class PassportForm extends Component {
  
  render() {

    return (

      <Paper zDepth={2}>
        <PassportForm 
          page={this.props.page}
          url="/v1/auth" />
      </Paper>

    )
  }

}

export default PassportForm