// bring together toolbars + content for individual sections
import React, { Component, PropTypes } from 'react'
import {
  ComponentWrapper
} from '../folder-ui/tools'

import SectionWrapper from '../folder-ui/components/SectionWrapper'

import actions from './actions'
import selectors from './selectors'

import Toolbars from './toolbars'
import Pages from './pages'
import Statics from './statics'

const Sections = (store) => {

  const toolbars = Toolbars(store)
  const pages = Pages(store)
  const statics = Statics(store)
  
  return {

    installation: {

      table: ComponentWrapper(SectionWrapper, {

        ToolbarComponent: toolbars.installation.table,
        ContentComponent: pages.installation.table,
        StaticComponents: statics.installation.table,

        initialize: () => {
          console.log('-------------------------------------------');
          console.log('loading data for installations')
        }

      })
    }
  }
}

export default Sections