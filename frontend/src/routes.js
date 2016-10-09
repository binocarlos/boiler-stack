import React, { Component, PropTypes } from 'react'
import { Route, IndexRoute } from 'react-router'
import { passporttools } from 'passport-service-gui'

import Wrapper from './containers/layout/Wrapper'
import AppBar from './containers/layout/AppBar'
import LoginAppBar from './containers/layout/LoginAppBar'
import Loader from './components/Loader'

import Login from './containers/Login'
import Register from './containers/Register'
import Folders from './containers/Folders'

export default (store) => {

  const getUserState = () => {
    return passporttools.getUser(store.getState())
  }

  // a route that requires the user to be logged in
  // redirect to /login if not
  const requireAuth = (nextState, replace, callback) => {
    const passport = getUserState()

    console.log('-------------------------------------------');
    console.log('requireAuth')
    console.log(JSON.stringify(passport, null, 4))
    /*
    if(!passport.loaded) return callback()
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }*/
    callback()
  }

  // a route that requires the user to not be logged in
  // redirect to / if they are
  const requireGuest = (nextState, replace, callback) => {
    const passport = getUserState()

    console.log('-------------------------------------------');
    console.log('requireGuest')
    console.log(JSON.stringify(passport, null, 4))
/*
    if (authenticated) {
      replace({
        pathname: '/'
      })
    }*/
    callback()
  }

  const getRoute = (path, content, appbar = AppBar, onEnter = requireAuth) => {
    return (
      <Route path={path} components={{content:content,appbar:appbar}} onEnter={onEnter} />
    )
  }

  return (
    <Route path="/" component={Wrapper}>
      <IndexRoute components={{appbar:AppBar,content:Loader}} onEnter={requireAuth} />
      {getRoute('folders', Folders)}
      {getRoute('login', Login, LoginAppBar, requireGuest)}
      {getRoute('register', Register, LoginAppBar, requireGuest)}
    </Route>
  )
}