import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import TableContainer from '../../boiler-ui/lib/plugins/table/Container'

import actions from '../actions'
import icons from '../config/icons'
import tables from '../config/tables'
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
        schema={ tables.installation.schema }
        mapData={ tables.installation.map(this.props.currentInstallation) }
        actions={ actions.installation.table }
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const userData = selectors.user.status.record(state).data || {}
  return {
    currentInstallation: userData.currentInstallation
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect: (path) => dispatch(actions.router.push(getRoute(path)))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallationTable)