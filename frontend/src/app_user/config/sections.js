import React, { Component, PropTypes } from 'react'

import icons from './icons'
import tables from './tables'
import schemas from './schemas'

const INSTALLATION = {
  id:'installation',
  type:'installation',
  title:'Company',
  pluralTitle:'Companies',
  route:'companies',
  actionPrefix:'INSTALLATIONS',
  url:'/api/v1/installations',
  icon:icons.installation,
  tableFields:tables.installation,
  schema:schemas.installation,
  initialFormData:{},
  drivers:{
    api:'mongocrud',
    controller:'crud',
    plugin:'crud'
  }
}

const sections = {
  installation:INSTALLATION
}

export default sections