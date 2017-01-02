import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import deepCheck from 'deep-check-error'

import Table from 'react-toolbox/lib/table'

import routerActions from '../../actions/router'
import TableToolbar from '../../components/toolbars/Table'

import Selectors from './selectors'

class TablePluginContainer extends Component {

  render() {

    return (
      <TableToolbar
        title={ this.props.title }
        icon={  this.props.icon }
        onAdd={ this.props.onAdd }
        redirect={ this.props.redirect }
        buttonActions={[
          ['Test1', 'inbox', '/'],
          ['Test2', 'inbox', '/']
        ]}
      >
        <Table
          heading={ true }
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

const REQUIRED_PROPS = [
  'selector'
]

const mapStateToProps = (state, ownProps) => {
  deepCheck(ownProps, REQUIRED_PROPS)
  const selectors = Selectors(ownProps.selector)
  let items = selectors.items(state)
  const selection = selectors.selection(state)

  if(ownProps.mapData) items = items.map(ownProps.mapData)

  return {
    data: items,
    selection: selection
  }
}

const REQUIRED_ACTIONS = [
  
]

const mapDispatchToProps = (dispatch, ownProps) => {
  deepCheck(ownProps, REQUIRED_ACTIONS)
  
  return {
    onSelect: (selection) => dispatch(ownProps.actions.selection.set(selection))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablePluginContainer)