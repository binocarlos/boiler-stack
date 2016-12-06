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

const mapStateToProps = (state, ownProps) => {
  state = ownProps.selector(state)
  return {
    data:state.data,
    children:state.children,
    rootids:state.rootids,
    open:state.open
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestInitialData:() => {
      console.log('load tree container')
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeContainer)