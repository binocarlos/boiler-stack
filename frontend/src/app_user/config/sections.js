import React, { Component, PropTypes } from 'react'

import icons from './icons'
import tables from './tables'
import schemas from './schemas'

const installation = {
  id:'installation',
  type:'installation',
  title:'Company',
  pluralTitle:'Companies',
  route:'companies',
  actionPrefix:'INSTALLATIONS',
  url:'/api/v1/installations',
  initialFormData:{}
}

const configs = {
  installation
}

const getSection = (id) => {
  if(!configs[id]) throw new Error('no section called: ' + id)
  return Object.assign({}, configs[id], {
    icon:icons[id],
    tableFields:tables[id],
    schema:schemas[id]
  })
}

export default getSection