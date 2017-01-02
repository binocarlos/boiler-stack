import React, { Component, PropTypes } from 'react'
import Table from 'react-toolbox/lib/table'
import TableToolbar from '../../components/toolbars/Table'

class TablePluginContainer extends Component {

  render() {
    return (
      <TableToolbar
        title={ this.props.title }
        icon={  this.props.icon }
        onAdd={ this.props.onAdd }
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
          source={ this.props.data }
        />
      </TableToolbar>
    )
  }
}

export default TablePluginContainer