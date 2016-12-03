import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FormComponent from 'kettle-ui/lib/Form'

import { formupdate } from '../actions'
import { getRegisterSchema } from '../schema'
import { getForm } from '../reducers/selectors'

export class RegisterForm extends Component {
  render() {
    return (
      <FormComponent {...this.props} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const settings = ownProps.settings || {}
  const formState = getForm(state, 'register')
  return {
    data:formState.data,
    meta:formState.meta,
    title:'Register',
    schema:getRegisterSchema({
      includeEmail:settings.includeEmail,
      includeUsername:settings.includeUsername,
      extraFields:settings.extraFields
    })
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    update:(data, meta) => {
      dispatch(formupdate('register', data, meta))
    },
    submit:(data, meta) => {
      if(!meta.valid){
        console.log('error')
        return
        //return dispatch(formerror(ownProps.name, data, meta))
      }
      console.log('submit register')
      console.dir(data)
      console.dir(meta)
      //dispatch(ownProps.submit(data, meta));
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterForm)