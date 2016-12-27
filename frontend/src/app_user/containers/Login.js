import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { 
  mapFormField,
  doesFormHaveError
} from '../../boiler-ui/lib/utils/formfields/tools'

import formfields from '../config/formfields'

import { login } from '../selectors'
import actions from '../actions'

import Login from '../components/Login'

class LoginContainer extends Component {

  componentDidMount() {
    this.props.initialize()
  }
  
  render() {
    const loginProps = Object.assign({}, this.props, {
      fields: formfields.login().map(field => {
        return mapFormField(field, this.props.data, this.props.meta, this.props.originalData, this.props.form_touched)
      })
    })
    return (
      <Login {...loginProps} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const formState = login.form(state)
  return Object.assign({}, formState, {
    valid: doesFormHaveError(formState.meta) ? false : true,
    form_touched: formState.meta.form_touched
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    initialize: () => {
      dispatch(actions.user.login.form.initialize())
    },
    update: (name, value) => {
      dispatch(actions.user.login.form.update(name, value))
    },
    touch: (name) => {
      dispatch(actions.user.login.form.touch(name))
    },
    submit: (valid) => {
      valid ?
        console.log('submit') :
        dispatch(actions.user.login.form.touchform())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer)