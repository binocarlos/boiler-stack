import React from 'react'
import { connect } from 'react-redux'
import { registerReset, loginReset, switchLoginMode, updateEmail, updatePassword } from '../actions/loginform'
import { registerUser, registerUserError } from '../actions/register'
import { loginUser, loginUserError } from '../actions/login'
import { fetchUser } from '../actions/user'
import Login from '../components/Login'

/*

  state:

   * urls - an object containing the urls for the auth API

     - register (e.g. POST /v1/auth/register)
     - login (e.g. POST /v1/auth/login)
  
*/

export function LoginFormContainer(props) {

  // the trigger to say we just logged in
  // reload the user state
  if(props.justLoggedIn){
    setTimeout(function(){
      props.resetLogin()
      props.fetchUser()
    })
  }

  return (
    <Login {...props} />
  )
}

function mapStateToProps(state) {

  var justRegisteredEmail = null

  // inject the register email address into the login form
  if(state.loginform.justRegistered){
    if(state.form.register && state.form.register.email){
      justRegisteredEmail = state.form.register.email.value
    }
  }

  return {
    mode:state.loginform.mode,
    justRegisteredEmail,
    justRegistered:state.loginform.justRegistered,
    justLoggedIn:state.loginform.justLoggedIn,
    loginMessage:state.loginform.loginMessage,
    loginError:state.login.error,
    loginErrors:state.login.formErrors || {},
    loginData:state.form.login,
    registerError:state.register.error,
    registerErrors:state.register.formErrors || {},
    registerData:state.form.register
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  var urls = ownProps.urls
  return {
    handleSwitch:function(mode){
      dispatch(switchLoginMode(mode))
    },
    handleRegister:function(credentials){
      dispatch(registerUser(urls.register, credentials))
    },
    handleLogin:function(credentials){
      dispatch(loginUser(urls.login, credentials))
    },
    resetRegister:function(message){
      dispatch(registerReset(message))
    },
    resetLogin:function(){
      dispatch(loginReset())
    },
    fetchUser:function(){
      dispatch(fetchUser(urls.status))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer)
