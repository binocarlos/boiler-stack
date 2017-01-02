import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import deepCheck from 'deep-check-error'

import routerActions from '../../actions/router'
import TableToolbar from '../../components/toolbars/Table'

class TablePluginContainer extends Component {

  render() {

    console.log('-------------------------------------------');
    console.log('-------------------------------------------');
    console.dir(this.props.data)
    console.dir(this.props.selection)
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
        <div>
            table
        </div>
      </TableToolbar>
    )
  }
}

const REQUIRED_PROPS = [
  'selector'
]

const mapStateToProps = (state, ownProps) => {
  deepCheck(ownProps, REQUIRED_PROPS)
  const tableState = ownProps.selector(state)
  return {
    data: tableState.data,
    selection: tableState.selection
  }
}

const REQUIRED_ACTIONS = [
  
]

const mapDispatchToProps = (dispatch, ownProps) => {
  deepCheck(ownProps, REQUIRED_ACTIONS)
  
  return {
    
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablePluginContainer)