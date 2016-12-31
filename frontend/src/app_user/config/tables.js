import React, { Component, PropTypes } from 'react'

import {
  text,
  small
} from '../../boiler-ui/lib/config/tables'

import selectors from '../selectors'

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
      })
    ]

  }
}

export default TABLES