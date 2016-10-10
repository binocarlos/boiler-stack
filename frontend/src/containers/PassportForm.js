import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { passporttools } from 'passport-service-gui'
import UIPassportForm from '../components/PassportForm'

export class PassportForm extends Component {
  render() {
    return (
      <UIPassportForm {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    page:ownProps.route.page
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    changePage:(page) => {
      // we get synthetic events from the tabs
      if(typeof(page)==='string') dispatch(routerActions.push('/' + page))
    },
    changeLocation:(url) => {
      dispatch(routerActions.push(url))
    },
    onLogin:() => {
      console.log('-------------------------------------------');
      console.log('did login')
    },
    onRegister:() => {
      console.log('-------------------------------------------');
      console.log('did register')
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassportForm)
