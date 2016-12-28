import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { RelativeFragment as Fragment } from 'redux-little-router'

import Logger from '../../logger'
import routerActions from '../../actions/router'
import { userStatusSelectors } from '../../plugins/user/selectors'
import { mapStateToProps } from './tools'

const logger = Logger('userredirector')
class UserRedirector extends Component {

  getRedirect(props = {}) {
    return this.props.redirector(props.loggedIn)
  }

  doRedirect(props = {}) {
    const redirectTo = this.getRedirect(props)
    if(!redirectTo) return
    logger('redirecting', redirectTo)
    this.props.redirect(redirectTo)
  }

  componentDidMount() {
    if(!this.props.loaded) return
    this.doRedirect(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.loaded) return
    if(this.getRedirect(this.props) != this.getRedirect(nextProps)) {
      this.doRedirect(nextProps)
    }
  }

  render() {
    return this.props.loaded ?
      this.props.children :
      (<div></div>)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    redirect: (path) => {
      dispatch(routerActions.push(path))
    }
  }
}

const UserRedirectorContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRedirector)

class UserRedirect extends Component {
  render() {

    return (
      <Fragment forRoute={this.props.route}>
        <UserRedirectorContainer redirector={this.props.redirector}>
          {this.props.children}
        </UserRedirectorContainer>
      </Fragment>      
    )
    return this.props.loaded ?
      this.props.children :
      (<div></div>)
  }
}

export default UserRedirect