import React, { Component, PropTypes } from 'react'
import Snackbar from '../containers/Snackbar'

const SnackbarPlugin = (settings = {}) => {

  const reducerName = settings.reducerName || 'snackbar'
  const getReducers = () => {
    return {
      [reducerName]: ToggleReducer()
    }
  }

  const getStatics = () => {
    return [{
      component: (
        <Snackbar {...settings} />
      )
    }]
  }

  return {
    getReducers,
    getStatics
  }
}

export default SnackbarPlugin