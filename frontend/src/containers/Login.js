import React, { PropTypes, Component } from 'react'
import AppBar from 'material-ui/AppBar'
import { PassportForm } from 'passport-service-gui'

const styles = {
  container:{
    marginTop:'100px'
  }
}

class Login extends Component {
  
  render() {

    var name = this.props.name || 'auth'
    
    return (

      <div>
        <AppBar
          showMenuIconButton={false}
          title="Login/Register"
          zDepth={2}
        />

        <div style={styles.container}>
          
          <PassportForm 
            url="/v1/auth" />

        </div>
      </div>
    )
  }

}

export default Login