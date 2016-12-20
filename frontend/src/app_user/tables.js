import React, { Component, PropTypes } from 'react'

import {
  text,
  small
} from '../folder-ui/config/tables'

import * as selectors from './selectors'

const TABLES = {

  installation: (store) => {

    const currentInstallation = selectors.installation.current(store.getState())

    return [
      small(text({
        name: 'littleid',
        title: 'ID'
      })),
      text({
        name: 'name',
        title: 'Name'
      }),
      small({
        title: 'Status',
        render: (data, field) => {
          return data.id == currentInstallation ?
            (
              <div>active</div>
            ) :
            null
        }
      })
    ]

  }
}

export default TABLES