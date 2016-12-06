import React, { Component, PropTypes } from 'react'
import DiggerDB from 'digger-folder-ui-db'

// the raw apis for each database
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

}
// the root node for each database
export const rootNodes = {
  coreresources:{
    id:'coreresources',
    readOnly:true,
    rootNode:{
      name:'System Resources'
    },
    db:apis.coreresources
  },
  userresources:{
    id:'userresources',
    rootNode:{
      name:'My Resources'
    },
    db:apis.userresources
  },
  projects:{
    id:'projects',
    rootNode:{
      name:'Projects'
    },
    db:apis.projects
  },
  clients:{
    id:'clients',
    rootNode:{
      name:'Clients'
    },
    db:apis.clients
  },
  quotes:{
    id:'quotes',
    rootNode:{
      name:'Quotes'
    },
    db:apis.quotes
  }
}

export const databases = {
  resources:CompositeDB([
    databases.userresources,
    databases.coreresources
  ]),
  projects:CompositeDB([
    databases.projects
  ]),
  clients:CompositeDB([
    databases.clients
  ]),
  quotes:CompositeDB([
    databases.quotes
  ])
}