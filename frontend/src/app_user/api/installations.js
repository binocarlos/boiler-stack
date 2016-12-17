import React, { Component, PropTypes } from 'react'

import mongoCrudAjaxFactory from '../../folder-ui/api/mongocrud'

export const SETTINGS = {
  type:'installation',
  title:'Installation',
  url:'/api/v1/installations'
}

const InstallationApi = (settings = {}) => {
  settings = Object.assign({}, SETTINGS, settings)

  return mongoCrudAjaxFactory({
    type:settings.type,
    title:settings.title,
    url:settings.url
  })
}

export default InstallationApi