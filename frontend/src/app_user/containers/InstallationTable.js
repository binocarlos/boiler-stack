import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import TableContainer from '../../boiler-ui/lib/plugins/table/Container'

import actions from '../actions'
import icons from '../config/icons'
import tables from '../config/tables'
import { getRoute } from '../tools'
import selectors from '../selectors'

const tableSelectors = selectors.installation.table
const routerActions = actions.router
const tableActions = actions.installation.table
const userSelector = selectors.user.status.record

const BASEPATH = '/companies'

class InstallationTable extends Component {
  render() {

    const tableMap = tables.installation.map(this.props.currentInstallation)
    const data = this.props.data.map(tableMap)
    const selected = this.props.selection.map(i => data[i])
    const title = selected.length == 1 ?
      selected[0].name :
      (
        selected.length > 0 ? 
          selected.length + ' ' :
          ''
      ) + 'Companies'

    return (
      <TableContainer
        title={ title }
        icon={ icons.installation }
        selectors={ selectors }
        heading={ true }
        onAdd={ selected.length == 0 ? this.props.onAdd : null }
        onEdit={ this.props.onEdit }
        onSelect={ this.props.onSelect }
        redirect={ this.props.redirect }
        schema={ tables.installation.schema }
        data={ this.props.data }
        selection={ this.props.selection }
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const userData = userSelector(state).data || {}
  const currentInstallation = userData.currentInstallation
  const selection = tableSelectors.selection(state)
  const data = tableSelectors.items(state)

  return {
    currentInstallation,
    data,
    selection
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect: (path) => dispatch(routerActions.push(getRoute(path))),
    onAdd: () => dispatch(routerActions.push(getRoute(BASEPATH + '/add'))),
    onEdit: (item) => dispatch(routerActions.push(getRoute(BASEPATH + '/edit/' + item.id))),
    onSelect: (selection) => dispatch(tableActions.selection.set(selection))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallationTable)