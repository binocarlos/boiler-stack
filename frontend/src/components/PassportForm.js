import React, { PropTypes, Component } from 'react'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router'
import { PassportForm as UIPassportForm } from 'passport-service-gui'
import { layout, passportForms } from '../styles'

class PassportForm extends Component {
  
  render() {

    const pageContent = {
      login:(
        <div style={passportForms.login}>
          <Link to="/register">Click here</Link> to register
        </div>
      ),
      register:(
        <div style={passportForms.register}>Enter your details to register.</div>
      )
    }

    return (

      <div style={layout.paddedContent}>
        <Paper zDepth={2}>
          <UIPassportForm 
            styles={{
              formwrapper:passportForms.wrapper
            }}
            page={this.props.page}
            changePage={this.props.changePage}
            onLogin={this.props.onLogin}
            onRegister={this.props.onRegister}
            pageContent={pageContent}
            url="/v1/auth" />
        </Paper>
      </div>

    )
  }

}

export default PassportForm