import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FormComponent from 'kettle-ui/lib/Form'

import { formupdate, login } from '../actions'
import { getLoginSchema } from '../schema'
import { getForm } from '../selectors'

export class LoginForm extends Component {
  render() {
    return (
      <FormComponent {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const settings = ownProps.settings || {}
  const formState = getForm(state, 'login')
  return {
    data:formState.data,
    meta:formState.meta,
    error:formState.error,
    disableButton:formState.meta.valid ? false : true,
    title:'Login',
    schema:getLoginSchema({
      primaryKey:settings.primaryKey
    })
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    update:(data, meta) => {
      dispatch(formupdate('login', data, meta))
    },
    submit:(data, meta) => {
      if(!meta.valid) return
      return dispatch(login.request(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)