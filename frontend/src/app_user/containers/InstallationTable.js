import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import TableContainer from '../../boiler-ui/lib/plugins/table/Container'

import { router as routerActions } from '../actions'
import icons from '../config/icons'
import { getRoute } from '../tools'
import selectors from '../selectors'

const selector = selectors.installation.table

class InstallationTable extends Component {
  render() {
    return (
      <TableContainer
        title='Companies'
        icon={ icons.installation }
        selector={ selector }
        onAdd={ () => this.props.redirect('/companies/add') }
        redirect={ this.props.redirect }
      />
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect: (path) => dispatch(routerActions.push(getRoute(path)))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallationTable)