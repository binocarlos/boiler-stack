import React, { PropTypes, Component } from 'react'
import Page from 'kettle-ui/lib/Page'
import Paper from 'material-ui/Paper'
import {Tabs, Tab} from 'material-ui/Tabs'

import LoginForm from '../containers/LoginForm'
import RegisterForm from '../containers/RegisterForm'

const STYLES = {
  wrapper:{
    margin:'20px',
  },
  // TODO: work out why the second tab needs some padding
  loginwrapper:{
    paddingBottom:'0px'
  },
  registerwrapper:{
    paddingBottom:'20px'
  }
}


class FormTabs extends Component {
  
  render() {

    const name = this.props.name || 'auth'
    const styles = this.props.styles || {}

    Object.keys(STYLES || {}).forEach(function(key){
      styles[key] = Object.assign({}, STYLES[key], styles[key])
    })

    const loginContent = this.props.settings.loginContent
    const registerContent = this.props.settings.registerContent

    return (
      <Page>
        <Paper zDepth={2}>
          <Tabs value={this.props.page} onChange={this.props.changePage}>
            <Tab label={this.props.loginTitle || 'Login'} value="login">
              <div style={Object.assign({}, styles.loginwrapper, styles.wrapper)}>
                <LoginForm settings={this.props.settings}>
                  {loginContent}
                </LoginForm>
              </div>
            </Tab>
            <Tab label={this.props.registerTitle || 'Register'} value="register">
              <div style={Object.assign({}, styles.registerwrapper, styles.wrapper)}>
                <RegisterForm settings={this.props.settings}>
                  {registerContent}
                </RegisterForm>
              </div>
            </Tab>
          </Tabs>
        </Paper>
      </Page>
    )
  }

}

export default FormTabs