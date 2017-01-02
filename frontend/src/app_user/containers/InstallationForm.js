import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import FormContainer from '../../boiler-ui/lib/plugins/form/Container'

import { getRoute } from '../tools'
import icons from '../config/icons'
import formfields from '../config/formfields'
import selectors from '../selectors'
import actions from '../actions'

const selector = (state) => selectors.installation.form(state).fields

class InstallationForm extends Component {
  render() {
    return (
      <FormContainer
        title='Company'
        icon={ icons.installation }
        onCancel={ () => this.props.redirect('/companies') }
        getFields={ formfields.installation }
        selector={ selector }
        actions={ actions.installation.form.fields }
      />
    )
  }
}

export default connect(
  null,
  (dispatch, ownProps) => {
    return {
      redirect: (path) => dispatch(actions.router.push(getRoute(path)))
    }
  }
)(InstallationForm)