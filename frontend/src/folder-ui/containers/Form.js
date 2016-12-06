import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { ToolbarWrapper } from '../components/Wrappers'
//import ActionToolbar from '../components/ActionToolbar'
//import ItemTable from '../components/ItemTable'

export class FormContainer extends Component {

  componentDidMount() {
    this.props.requestInitialData()
  }
  
  componentWillReceiveProps(nextProps) {
    
  }

  render() {
    const toolbar = (
      <div>Form Toolbar</div>
    )

    return (
      <ToolbarWrapper
        toolbar={toolbar}>
        <div>hello form content</div>
      </ToolbarWrapper>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    requestInitialData:() => {
      console.log('load form container')
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormContainer)
