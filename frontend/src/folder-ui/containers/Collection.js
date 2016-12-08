import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ToolbarWrapper } from '../components/Wrappers'
import ActionToolbar from '../components/ActionToolbar'
import Table from '../components/Table'

export class TableContainer extends Component {

  componentDidMount() {
    this.props.requestInitialData()
  }
  
  componentWillReceiveProps(nextProps) {
    
  }

  render() {

    const TableComponent = this.props.tableClass || Table
    const ToolbarComponent = this.props.toolbarClass || ActionToolbar

    const parentToolbarProps = this.props.getToolbarProps ?
      this.props.getToolbarProps() :
      {}

    const parentTableProps = this.props.getTableProps ?
      this.props.getTableProps() :
      {}

    // we merge together the two sets of props with the data props in common
    const toolbarProps = Object.assign({}, parentToolbarProps, this.props.toolbarHandlers, this.props.dataProps)
    const tableProps = Object.assign({}, parentTableProps, this.props.tableHandlers, this.props.dataProps)

    return (
      <ToolbarWrapper
        toolbar={<ToolbarComponent {...toolbarProps} />}>
        <TableComponent {...tableProps} />
      </ToolbarWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  if(!ownProps.selector) throw new Error('selector prop needed for Collection container')
  const localState = ownProps.selector(state) || {}
  const fields = ownProps.getTableFields ?
    ownProps.getTableFields(localState.parent, localState.data) :
    []
  return {
    dataProps:{
      data:localState.data,
      selected:localState.selected,
      parent:localState.parent
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  if(!ownProps.requestInitialData) throw new Error('no requestInitialData prop given to Collection container')

  const tableHandlers = {
    onRowSelection:(idArray) => {
      if(!ownProps.onRowSelection) return
      ownProps.onRowSelection(idArray)
    }
  }

  const toolbarHandlers = {

  }

  return {
    requestInitialData:() => {
      ownProps.requestInitialData()
    },
    tableHandlers,
    toolbarHandlers
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer)
