import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FormComponent from 'kettle-ui/lib/Form'

import { formupdate } from '../actions'
import { getLoginSchema } from '../schema'

export class LoginForm extends Component {
  render() {
    return (
      <FormComponent {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const passportState = state[ownProps.reducername || 'passport']
  const settings = ownProps.settings || {}
  return {
    data:passportState.login.data,
    meta:passportState.login.meta,
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
      if(!meta.valid){
        console.log('error')
        return
        //return dispatch(formerror(ownProps.name, data, meta))
      }
      console.log('submit login')
      console.dir(data)
      console.dir(meta)
      //dispatch(ownProps.submit(data, meta));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)