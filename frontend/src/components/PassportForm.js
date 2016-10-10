import React, { PropTypes, Component } from 'react'
import Paper from 'material-ui/Paper'
import { PassportForm as UIPassportForm } from 'passport-service-gui'
import { layout } from '../styles'

class PassportForm extends Component {
  
  render() {

    // the login or register part is fed via the route
    const page = this.props.route.page

    return (

      <div style={layout.paddedContent}>
        <Paper zDepth={2}>
          <UIPassportForm 
            page={page}
            url="/v1/auth" />
        </Paper>
      </div>

    )
  }

}

export default PassportForm