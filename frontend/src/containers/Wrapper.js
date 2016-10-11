import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { passporttools, UserLoader } from 'passport-service-gui'
import AppWrapper from 'kettle-ui/lib/AppWrapper'
import AppBar from './AppBar'
import Loader from '../components/Loader'

/*

  the Wrapper displays the content of the top-level routes
  and the AppBar

  both Wrapper and AppBar use the 'passport' state property
  to determine if the user is logged in

  there are 3 possible states for the user:

   * loading
   * guest
   * logged in

  for loading - the wrapper will display a loading spinner
  and the topbar will display an empty title

  for guest - we redirect to /login

  for logged in - we display the children
  
*/
export class Wrapper extends Component {

  render() {
    return ( 
      <UserLoader url="/v1/auth/status" onLoaded={this.props.userLoaded}>
        <AppWrapper
          appbar={
            <AppBar />
          }>
          <div>
          

            {
              // until we have loaded the user status, we do not display any content
              this.props.passport.loaded ? 
              this.props.children :
              <Loader />
            }

          </div>
          
        </AppWrapper>
      </UserLoader>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {  
    passport:passporttools.getUser(state)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    // on the initial data loading only
    // we move the user to '/login if they are not logged in'
    // after this point the onEnter handlers for the routes take over
    userLoaded:(data = {}) => {
      if(!data.loggedIn) dispatch(routerActions.push('/login'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wrapper)
