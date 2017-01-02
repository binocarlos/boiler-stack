import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import routerActions from '../../actions/router'
import FormToolbar from '../../components/toolbars/Form'
import FormComponent from '../../components/Form'
import FormContainer from '../../containers/Form'

import {
  doesFormHaveError
} from '../../utils/formfields/tools'

class FormPluginContainer extends Component {
  render() {
    return (
      <FormToolbar
        title={ this.props.title }
        icon={ this.props.icon }
        onCancel={ this.props.onCancel }
        onRevert={ this.props.revert }
        onSave={ this.props.save }
        valid={ this.props.valid }
      >
        <FormContainer
          formComponent={ FormComponent }
          getFields={ this.props.getFields }
          selector={ this.props.selector }
          actions={ this.props.formActions }
        />

      </FormToolbar>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    valid: doesFormHaveError(ownProps.selector(state).meta) ? false : true
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    revert: () => dispatch(ownProps.formActions.revert()),
    save: () => dispatch(ownProps.formActions.submit())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormPluginContainer)