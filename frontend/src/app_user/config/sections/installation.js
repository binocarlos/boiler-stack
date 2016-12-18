import React, { Component, PropTypes } from 'react'

import icons from './icons'
import tables from './tables'
import schemas from './schemas'

import INSTALLATION from './sections/installation'

const CONFIGS = {
  installation:INSTALLATION 
}

const getSection = (id) => {
  return Object.assign({}, CONFIGS[id], {
    icon:icons[id],
    tableFields:tables[id],
    schema:schemas[id]
  })
}

const installation = getSection('installation')

const sections = {
  installation
}

export default sections