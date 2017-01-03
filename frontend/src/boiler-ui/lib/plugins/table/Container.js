import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Table from 'react-toolbox/lib/table'
import TableToolbar from '../../components/toolbars/Table'
import routerActions from '../../actions/router'

class TablePluginContainer extends Component {

  render() {

    const data = this.props.mapData ?
      this.props.data.map(this.props.mapData) :
      this.props.data

    const selectedItems = this.props.selection.map(i => data[i])

    const title = selectedItems.length == 1 ?
      selectedItems[0].name :
      (
        selectedItems.length > 0 ? 
          selectedItems.length + ' ' :
          ''
      ) + this.props.title

    return (
      <TableToolbar
        title={ this.props.title }
        icon={  this.props.icon }
        onAdd={ selectedItems.length == 0 ? this.props.onAdd : null }
        redirect={ this.props.redirect }
        buttonActions={ this.props.buttonActions }
      >
        <Table
          heading={ this.props.heading }
          model={ this.props.schema }
          onSelect={ this.props.onSelect }
          selectable
          multiSelectable
          selected={ this.props.selection }
          source={ data }
        />
      </TableToolbar>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  const selection = ownProps.selectors.selection(state)
  const data = ownProps.selectors.items(state)

  return {
    data,
    selection
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const tableActions = ownProps.actions
  const BASEPATH = ownProps.basepath
  const getRoute = ownProps.getRoute
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
)(TablePluginContainer)