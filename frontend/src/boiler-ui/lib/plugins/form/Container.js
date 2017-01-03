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
      .getFormFields(this.props.data, this.props.meta)
      .map(field => {
        return mapFormField(field, this.props.data, this.props.meta, this.props.originalData, this.props.form_touched)
      })

    const title = this.props.data.id ?
      this.props.originalData.name :
      'New ' + this.props.title

    return (
      <FormToolbar
        title={ title }
        icon={ this.props.icon }
        onCancel={ this.props.cancel }
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

const mapStateToProps = (state, ownProps) => {
  const formState = ownProps.selectors.fields(state)
  return {
    valid: doesFormHaveError(formState.meta) ? false : true,
    form_touched: formState.meta.form_touched,
    data: formState.data,
    meta: formState.meta,
    originalData: formState.originalData
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const actions = ownProps.actions
  return {
    update: (name, value) => dispatch(actions.fields.update(name, value)),
    touch: (name) => dispatch(actions.fields.touch(name)),
    revert: () => dispatch(actions.fields.revert()),
    cancel: () => dispatch(routerActions.push(ownProps.routes.cancel)),
    submit: (valid) => {
      valid ?
        dispatch(actions.fields.submit(ownProps.routes.success)) :
        dispatch(actions.fields.touchform())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormPluginContainer)