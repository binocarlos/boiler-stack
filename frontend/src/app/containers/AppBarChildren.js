import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AppBarChildren from '../components/AppBarChildren'
import { passporttools, actions } from 'passport-service-gui'

import {
  togleProjectMenu
} from '../actions'

export class AppBarChildrenContainer extends Component {

  checkForProjectData(props) {
    return props.loggedIn && !props.loadingStatus
  }

  componentDidMount() {
    if(this.checkForProjectData(this.props)){
      this.props.requestProjectData()
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.checkForProjectData(nextProps)){
      this.props.requestProjectData()
    }
  }
  
  render() {
    return (
      <AppBarChildren {...this.props} />
    )
  }
}

function mapStateToProps(state, ownProps) {

  const userStatus = passporttools.getUser(state)

  const projectState = state.app.projects
  const projects = projectState.data || []
  let currentProject = projectState.active

  // if the app has no currentProject
  // see if we can load it from the user
  if(!currentProject && userStatus.loaded && userStatus.loggedIn){
    const user = userStatus.user || {}
    const userData = user.data || {}
    currentProject = userData.currentProject
  }

  return {
    loggedIn:userStatus.loaded && userStatus.loggedIn,
    loadingStatus:projectState.status,
    projects,
    currentProject
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    setCurrentProject:(id) => {
      console.log('-------------------------------------------');
      console.log('project: ' + id)
    },
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
