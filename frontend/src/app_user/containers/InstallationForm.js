import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { router as routerActions } from '../actions'
import FormToolbar from '../../boiler-ui/lib/components/toolbars/Form'
import FormComponent from '../../boiler-ui/lib/components/Form'
import FormContainer from '../../boiler-ui/lib/containers/Form'
import icons from '../config/icons'
import { getRoute } from '../tools'

import formfields from '../config/formfields'
import selectors from '../selectors'
import actions from '../actions'

import {
  doesFormHaveError
} from '../../boiler-ui/lib/utils/formfields/tools'

const formDataSelector = (state) => selectors.installation.form(state).fields

class InstallationForm extends Component {

  render() {

    return (
      <FormToolbar
        title='Company'
        icon={ icons.installation }
        onCancel={ () => this.props.redirect('/companies') }
        onRevert={ this.props.revert }
        onSave={ this.props.save }
        valid={ this.props.valid }
      >
        <FormContainer
          formComponent={ FormComponent }
          getFields={ formfields.installation }
          selector={ formDataSelector }
          actions={ actions.installation.form.fields }
        />

      </FormToolbar>
    )
  }

}


const mapStateToProps = (state, ownProps) => {
  return {
    valid: doesFormHaveError(formDataSelector(state).meta) ? false : true
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect: (path) => dispatch(routerActions.push(getRoute(path))),
    revert: () => console.log('revert'),
    save: () => console.log('save')
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallationForm)