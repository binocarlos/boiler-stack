import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import TableContainer from '../../boiler-ui/lib/plugins/table/Container'

import actions from '../actions'
import icons from '../config/icons'
import tables from '../config/tables'
import { getRoute } from '../tools'
import selectors from '../selectors'

const routerActions = actions.router
const userSelector = selectors.user.status.record

const tableSelectors = selectors.installation.table
const tableActions = actions.installation.table
const tableSchema = tables.installation.schema

const BASEPATH = '/companies'
const TITLE = 'Companies'

class InstallationTable extends Component {
  render() {

    const tableProps = Object.assign({}, this.props, {
      mapData: tables.installation.map(this.props.currentInstallation),
      selectors: tableSelectors,
      actions: tableActions,
      schema: tableSchema,
      getRoute
    })

    return (
      <TableContainer {...tableProps} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const userData = userSelector(state).data || {}
  const currentInstallation = userData.currentInstallation
  return {
    currentInstallation,
    title: TITLE,
    basepath: BASEPATH,
    icon: icons.installation
  }
}

export default connect(
  mapStateToProps,
  null
)(InstallationTable)