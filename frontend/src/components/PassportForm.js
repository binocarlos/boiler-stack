import React, { PropTypes, Component } from 'react'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router'
import Divider from 'material-ui/Divider'
import { PassportForm as UIPassportForm } from 'passport-service-gui'
import { layout, passportForms } from '../styles'

class PassportForm extends Component {
  
  render() {

    const pageContent = {
      login:(
        <div style={passportForms.login}>
          <Divider />
          <div style={passportForms.content}>
            <Link to="/register">Click here</Link> to register
          </div>
        </div>
      ),
      register:(
        <div style={passportForms.register}>
          <Divider />
          <div style={passportForms.content}>
            Enter your details to register.
          </div>
        </div>
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
            url={this.props.url} />
        </Paper>
      </div>

    )
  }

}

export default PassportForm