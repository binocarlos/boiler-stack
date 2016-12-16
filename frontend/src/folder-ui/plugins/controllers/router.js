import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'

const RouterController = (settings = {}) => {

  const actions = {
    redirect:routerActions.push
  }

  return {
    actions
  }
}

export default RouterController