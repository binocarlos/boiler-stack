import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {stateMapper,dispatchMapper} from '../../../shared/auth/utils'

import Menu from '../components/Menu'

export class MenuContainer extends Component {
  render() {

    var props = this.props

    function logout(){
      props.handleLogout(props.authurls.logout)
    }

    return (
      <Menu links={this.props.links} handleLogout={logout} />
    )
  }
}

function mapStateToProps(state) {

  state = stateMapper(state)

  state.links = state.userLoggedin ? [{
    url:'/',
    title:'Dashboard',
    icon:'dashboard'
  },{
    url:'/projects',
    title:'Projects',
    icon:'cubes'
  },{
    url:'/help',
    title:'Help',
    icon:'question'
  }/*,{
    url:'/library',
    title:'Library',
    icon:'bars'
  }*/] : [{
    url:'/',
    title:'Login'
  }]

  return state
}

function mapDispatchToProps(dispatch) {
  return dispatchMapper(dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuContainer)
