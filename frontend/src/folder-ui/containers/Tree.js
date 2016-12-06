import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Tree from '../components/Tree'

export class TreeContainer extends Component {

  componentDidMount() {
    this.props.requestInitialData()
  }
  
  componentWillReceiveProps(nextProps) {
    
  }

  render() {
    return (
      <Tree {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  state = ownProps.getState(state)

  return {
    data:state.data,
    children:state.children,
    rootids:state.rootids
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeContainer)
