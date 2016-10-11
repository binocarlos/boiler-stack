import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import { passporttools } from 'passport-service-gui'

import Wrapper from './containers/Wrapper'
import AppBar from './containers/AppBar'
import Loader from './components/Loader'
import Page from './components/Page'

import PassportForm from './containers/PassportForm'
import Folders from './containers/Folders'
import Dashboard from './containers/Dashboard'

export default (store) => {

  const getUserState = () => {
    return passporttools.getUser(store.getState())
  }

  // a route that requires the user to be logged in
  // redirect to /login if not
  const requireAuth = (nextState, replace, callback) => {
    const passport = getUserState()
    if (passport.loaded && !passport.loggedIn) {
      replace({
        pathname: '/login'
      })
    }
    callback()
  }

  // a route that requires the user to not be logged in
  // redirect to / if they are
  const requireGuest = (nextState, replace, callback) => {
    const passport = getUserState()
    if (passport.loaded && passport.loggedIn) {
      replace({
        pathname: '/'
      })
    }
    callback()
  }

  return (
    <Route path="/" component={Wrapper}>
      <Route component={Page}>
        <IndexRoute component={Dashboard} onEnter={requireAuth} />
      </Route>
      <Route path="folders" component={Folders} onEnter={requireAuth} />
      <Route path="folders/*" component={Folders} onEnter={requireAuth} />
      <Route path="login" component={PassportForm} page="login" onEnter={requireGuest} />
      <Route path="register" component={PassportForm} page="register" onEnter={requireGuest} />
    </Route>
  )
}