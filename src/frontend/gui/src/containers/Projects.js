import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Loading from '../components/Loading'

import { fetchProjects } from '../actions/project'

import ProjectsComponent from '../components/Projects'

class Projects extends Component {
  render() {
    var props = this.props

    if(!props.loaded){
      return <Loading />
    }

    if(props.error){
      return (
        <div>error: {props.error}</div>
      )
    }

    return (
      <ProjectsComponent {...props} />
    )
  }

  componentWillMount() {
    this.props.loadProjects(this.props.url)
  }
}

function mapStateToProps(state) {

  var data = Object.keys(state.library.data || {}).map(function(key){
    return state.library.data[key]
  })

  return {
    url:state.urls.projects,
    loaded:state.project.loaded,
    loading:state.project.loading,
    error:state.project.error,
    data:state.project.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadProjects:function(url){
      dispatch(fetchProjects(url))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects)
