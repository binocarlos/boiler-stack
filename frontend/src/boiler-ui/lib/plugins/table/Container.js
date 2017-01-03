import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Table from 'react-toolbox/lib/table'
import Dialog from 'react-toolbox/lib/dialog'

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
    const selectedIds = selectedItems.map(item => item.id)
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

    if(selectedItems.length >= 1) {
      buttonActions.push(['Delete', 'delete', this.props.openDeleteWindow])
    }

    let deleteItems = selectedItems.map(item => item.name)
    let deleteTitle = ''

    if(deleteItems.length > 1) {
      const lastItem = deleteItems.pop()
      deleteTitle = deleteItems.join(', ') + ' and ' + lastItem
    }
    else if(deleteItems.length == 1) {
      deleteTitle = deleteItems[0]
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
        <Dialog
          actions={[
            { label: "Cancel", icon: 'cancel', onClick: this.props.closeDeleteWindow },
            { label: "Delete", icon: 'delete', onClick: () => this.props.confirmDelete(selectedIds, title) }
          ]}
          active={ this.props.isDeleteWindowOpen }
          onEscKeyDown={ this.props.closeDeleteWindow }
          onOverlayClick={ this.props.closeDeleteWindow }
          title={ 'Delete ' + title + '?' }
        >
          <p>Are you sure you want to delete { deleteTitle } ?</p>
        </Dialog>
      </TableToolbar>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const selection = ownProps.selectors.selection(state)
  const data = ownProps.selectors.items(state)
  const isDeleteWindowOpen = ownProps.selectors.deleteWindowOpen(state)

  // inject extra state that can be passed to the mapFunction
  const extraState = ownProps.mapStateToProps ?
    ownProps.mapStateToProps(state, ownProps) :
    {}

  return Object.assign({}, extraState, {
    data,
    selection,
    isDeleteWindowOpen
  })
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const actions = ownProps.actions
  return {
    add: () => dispatch(routerActions.push(ownProps.routes.add)),
    edit: (id) => dispatch(routerActions.push(ownProps.routes.edit.replace(':id', id))),
    select: (selection) => dispatch(actions.selection.set(selection)),
    openDeleteWindow: () => dispatch(actions.deleteWindow.open()),
    closeDeleteWindow: () => dispatch(actions.deleteWindow.close()),
    // send an 'ids' property to the query and we can do multi-delete
    confirmDelete: (ids, message) => dispatch(actions.delete.request(null, {ids, message}))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablePluginContainer)