import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import AppBarChildren from '../components/AppBarChildren'
import { passporttools, actions } from 'passport-service-gui'

import {
  setCurrentProject,
  updateUser,
  requestUpdateUserProject
} from '../../actions'

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

    // the user has a projectid but we don't
    // have that in the state
    if(nextProps.updateProject){
      this.props.setCurrentProject(nextProps.updateProject, true)
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

  // we use this to update the store with the
  // project id from the user
  let updateProject = null

  // if the app has no currentProject
  // see if we can load it from the user
  if(!currentProject && userStatus.loaded && userStatus.loggedIn){
    const user = userStatus.user || {}
    const userData = user.data || {}
    updateProject = currentProject = userData.currentProject
  }

  return {
    loggedIn:userStatus.loaded && userStatus.loggedIn,
    loadingStatus:projectState.status,
    projects,
    currentProject,
    updateProject
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {

    setCurrentProject:(id) => {
      dispatch(setCurrentProject(id))
    },
    /*
    
      update the user with the project id
      then set the state with the id
      
    */
    changeProject:(id) => {
      dispatch(requestUpdateUserProject(id))
    },
    requestProjectData:() => {
      dispatch(ownProps.loadProjectData())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBarChildrenContainer)
