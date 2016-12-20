// bring together toolbars + content for individual sections
import React, { Component, PropTypes } from 'react'
import {
  RouteLoader
} from '../folder-ui/lib/tools'

import SectionWrapper from '../folder-ui/lib/components/SectionWrapper'

import actions from './actions'
import selectors from './selectors'

import Toolbars from './toolbars'
import Pages from './pages'
import Statics from './statics'

const Screens = (store) => {

  const toolbars = Toolbars(store)
  const pages = Pages(store)
  const statics = Statics(store)
  
  return {

    installation: {

      table: RouteLoader({
        // return true to trigger a new load
        compare: (newRoute, oldRoute) => {
          return false
        },
        loader: (routeInfo, route) => {
          console.log('-------------------------------------------');
          console.log('-------------------------------------------');
          console.log('loading data for the installations page')
        },
        props: {

          ToolbarComponent: toolbars.installation.table,
          ContentComponent: pages.installation.table,
          StaticComponents: statics.installation.table

        }

      })
    }
  }
}

export default Screens