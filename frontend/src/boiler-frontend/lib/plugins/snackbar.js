import React, { Component, PropTypes } from 'react'
import Snackbar from '../containers/Snackbar'

const SnackbarPlugin = (settings = {}) => {

  const getStatics = () => {
    return [
      <Snackbar {...settings} />
    ]    
  }

  return {
    getStatics
  }
}

export default SnackbarPlugin