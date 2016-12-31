import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'

import FormTabs from '../components/FormTabs'

class FormTabsContainer extends Component {
  
  render() {
    return (
      <FormTabs
        page={this.props.page}
        changePage={this.props.changePage}
        settings={this.props.settings}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    page:ownProps.route.page,
    settings:ownProps.route.settings
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changePage:(page) => {
      const newRoute = page == 'login' ?
        ownProps.route.settings.loginRoute :
        ownProps.route.settings.registerRoute
      dispatch(routerActions.push('/' + newRoute))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormTabsContainer)