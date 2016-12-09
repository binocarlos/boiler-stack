import React, { Component, PropTypes } from 'react'
//import DiggerDB from 'digger-folder-ui-db'
import Ajax from '../folder-ui/api/ajax'
import MongoCodec from '../folder-ui/api/mongocodec'

export const mongoCodecFactory = (type) => MongoCodec({
  inject:{
    _type:type
  }
})

export const ajaxFactory = (opts) => Ajax(opts)


// the raw apis for each database
/*
export const apis = {
  
  coreresources:DiggerDB({
    readOnly: true,
    // this database speaks to the core system
    baseurl:(context) => {
      return '/api/v1/digger/core/resources'
    }
  }),
  userresources:DiggerDB({
    // what backend api url do we use depends upon the current project
    baseurl:(context) => {
      const projectID = getCurrentProject(context.state)
      return '/api/v1/digger/' + projectID + '/resources'
    }
  }),
  projects:MongoCrudDB({
    baseurl:'/api/v1/projects',
    inject:{
      _type:'project'
    }
  }),
  accounts:MongoCrudDB({
    baseurl:'/api/v1/accounts',
    inject:{
      _type:'account'
    }
  }),
  clients:MongoCrudDB({
    baseurl:(context) => {
      const projectID = getCurrentProject(context.state)
      return '/api/v1/clients/' + projectID
    },
    inject:{
      _type:'client'
    }
  }),
  quotes:MongoCrudDB({
    baseurl:(context) => {
      const projectID = getCurrentProject(context.state)
      return '/api/v1/quotes/' + projectID
    },
    inject:{
      _type:'quote'
    }
  })

  accounts:MongoCrudDB({
    baseurl:'/api/v1/accounts',
    inject:{
      _type:'account'
    }
  })

}*/