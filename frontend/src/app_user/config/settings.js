import React, { Component, PropTypes } from 'react'

import icons from './icons'
import tables from './tables'
import schemas from './schemas'

const BASE_API_URL = '/api/v1'

const URLS = {
  installation:BASE_API_URL + '/installations'
}

const ICONS = {
  installation:icons.CLOUD
}

const CORE = {
  title:'Boiler App',
  appURL:'/app',
  currentUserURL:BASE_API_URL + '/currentuser'
}

const INSTALLATION = {
  id:'installation',
  type:'installation',
  title:'Company',
  pluralTitle:'Companies',
  route:'companies',
  reducerName:'installations',
  actionPrefix:'INSTALLATIONS',
  initialFormData:{},
  url:URLS.installation,
  icon:ICONS.installation,
  tableFields:tables.installation,
  schema:schemas.installation
}

const settings = {
  core:CORE,
  installation:INSTALLATION
}

export default settings