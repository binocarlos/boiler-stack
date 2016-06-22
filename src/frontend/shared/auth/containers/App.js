import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {stateMapper,dispatchMapper,authWrapper} from '../utils'
import Login from './Login'
import Loading from '../../common/components/Loading'

export class App extends Component {
  render() {

    if(this.props.shouldLoadUser){
      this.props.fetchUser(this.props.urls.status)
    }

    if(!this.props.userLoaded){
      return <Loading />
    }
    else if(this.props.userLoggedin){
      return this.props.children
    }
    else {
      return <Login urls={this.props.urls} />
    }
    
  }
}

function mapStateToProps(state) {

  return stateMapper(state)

}

function mapDispatchToProps(dispatch) {

  return dispatchMapper(dispatch)

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
