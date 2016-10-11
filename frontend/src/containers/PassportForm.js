import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { passporttools, actions } from 'passport-service-gui'
import { auth } from '../settings'
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
    page:ownProps.route.page,
    url:auth.url
  }
}

function mapDispatchToProps(dispatch, ownProps) {

  const postLogin = (err) => {

    if(err) return

    // clear existing passport state
    dispatch(actions.resetStatus())

    // redirect to '/'
    dispatch(routerActions.push('/'))
  }

  return {
    changePage:(page) => {
      // we get synthetic events from the tabs
      if(typeof(page)==='string') dispatch(routerActions.push('/' + page))
    },
    changeLocation:(url) => {
      dispatch(routerActions.push(url))
    },

    // once the user has logged in - first reset the passport state
    // then re-direct to '/' which will trigger the UserLoader
    onLogin: postLogin,

    // once the user has registered
    // perform a login using the same details
    onRegister:(err, body, opts) => {

      if(err) return

      opts = Object.assign({}, opts, {
        url:auth.url + '/login'
      })

      dispatch(actions.login(opts, postLogin))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PassportForm)
