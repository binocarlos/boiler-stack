import React, { Component, PropTypes } from 'react'

const CorePlugin = (settings = {}) => {
  return {
    getSettings:() => {
      return {
        getTitle:() => settings.title
      }
    }
  }
}

export default CorePlugin