import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AppBarChildren from '../components/AppBarChildren'

import {
  togleProjectMenu
} from '../actions'

export class AppBarChildrenContainer extends Component {

  componentDidMount() {
    this.props.requestProjectData()
  }
  
  render() {
    return (
      <AppBarChildren {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {

  const projectData = state.app.projectData

  const projects = projectData.status == 'loaded' ?
    projectData.data :
    []

  return {
    projects,
    currentProject:state.app.currentProject
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    requestProjectData:() => {
      if(ownProps.loadProjectData){
        dispatch(ownProps.loadProjectData())
      }
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBarChildrenContainer)
