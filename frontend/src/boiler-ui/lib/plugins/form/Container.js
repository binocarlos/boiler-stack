// there is code duplication between this and the containers/Form
// TODO: refactor
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import deepCheck from 'deep-check-error'

import routerActions from '../../actions/router'
import FormToolbar from '../../components/toolbars/Form'
import FormComponent from '../../components/Form'

import {
  mapFormField,
  doesFormHaveError
} from '../../utils/formfields/tools'

class FormPluginContainer extends Component {

  render() {

    const fields = this.props
      .getFields(this.props.data, this.props.meta)
      .map(field => {
        return mapFormField(field, this.props.data, this.props.meta, this.props.originalData, this.props.form_touched)
      })

    return (
      <FormToolbar
        title={ this.props.title }
        icon={ this.props.icon }
        onCancel={ this.props.onCancel }
        onRevert={ this.props.revert }
        onSubmit={ () => this.props.submit(this.props.valid) }
        valid={ this.props.valid }
      >
        <FormComponent
          fields={ fields }
          update={ this.props.update }
          touch={ this.props.touch }
        />

      </FormToolbar>
    )
  }
}

const REQUIRED_PROPS = [
  'selector'
]

const mapStateToProps = (state, ownProps) => {
  deepCheck(ownProps, REQUIRED_PROPS)
  const formState = ownProps.selector(state)
  return {
    valid: doesFormHaveError(formState.meta) ? false : true,
    form_touched: formState.meta.form_touched,
    data: formState.data,
    meta: formState.meta,
    originalData: formState.originalData
  }
}

const REQUIRED_ACTIONS = [
  'formActions.update',
  'formActions.touch',
  'formActions.touchform',
  'formActions.submit'
]

const mapDispatchToProps = (dispatch, ownProps) => {
  deepCheck(ownProps, REQUIRED_ACTIONS)
  const formActions = ownProps.formActions
  return {
    update: (name, value) => dispatch(formActions.update(name, value)),
    touch: (name) => dispatch(formActions.touch(name)),
    revert: () => dispatch(formActions.revert()),
    submit: (valid) => {
      valid ?
        dispatch(formActions.submit()) :
        dispatch(formActions.touchform())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormPluginContainer)