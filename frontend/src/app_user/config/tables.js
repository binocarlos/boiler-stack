import React, { Component, PropTypes } from 'react'
import Chip from 'react-toolbox/lib/chip'
import Avatar from 'react-toolbox/lib/avatar'

const TABLES = {

  installation: {
    schema: {
      name: {type: String},
      status: {}
    },
    map: (currentInstallation) => (item) => {

      const active = item.id == currentInstallation ?
        (
          <Chip>
            <Avatar style={{backgroundColor: 'deepskyblue'}} icon="done" />
            <span>
              active
            </span>
          </Chip>
        ) :
        null

      return {
        id: item.id,
        name: item.name,
        status: (
          <div style={{
            display: 'flex',
            justifyContent: 'left'
          }}>
            {active}
          </div>
        )
      }
    }
  }
}

export default TABLES