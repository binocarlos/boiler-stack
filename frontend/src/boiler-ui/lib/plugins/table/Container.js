import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Table from 'react-toolbox/lib/table'
import TableToolbar from '../../components/toolbars/Table'
import routerActions from '../../actions/router'

class TablePluginContainer extends Component {

  render() {

    // get a map function that can transform the table
    // data based on the extra state selector
    const mapFunction = this.props.getMapFunction ?
      this.props.getMapFunction(this.props) :
      (data) => data

    const data = this.props.data.map(mapFunction)
    const selectedItems = this.props.selection.map(i => data[i])
    const tableFields = this.props.getTableFields()

    const title = selectedItems.length == 1 ?
      selectedItems[0].name :
      (
        selectedItems.length > 0 ? 
          selectedItems.length + ' ' :
          ''
      ) + this.props.title

    let buttonActions = []

    if(selectedItems.length == 1) {
      buttonActions.push(['Edit', 'create', () => this.props.edit(selectedItems[0].id)])
    }

    return (
      <TableToolbar
        title={ title }
        icon={  this.props.icon }
        onAdd={ selectedItems.length == 0 ? this.props.add : null }
        buttonActions={ buttonActions }
      >
        <Table
          heading={ this.props.heading }
          model={ tableFields }
          onSelect={ this.props.select }
          selectable={ data.length > 0 }
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

  // inject extra state that can be passed to the mapFunction
  const extraState = ownProps.mapStateToProps ?
    ownProps.mapStateToProps(state, ownProps) :
    {}

  return Object.assign({}, extraState, {
    data,
    selection
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const actions = ownProps.actions
  return {
    add: () => dispatch(routerActions.push(ownProps.routes.add)),
    edit: (id) => dispatch(routerActions.push(ownProps.routes.edit.replace(':id', id))),
    select: (selection) => dispatch(actions.selection.set(selection))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablePluginContainer)