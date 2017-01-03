import React, { Component, PropTypes } from 'react'
import Chip from 'react-toolbox/lib/chip'

const TABLES = {

  installation: {
    schema: {
      name: {type: String},
      active: {}
    },
    map: (currentInstallation) => (item) => {

      const active = item.id == currentInstallation ?
        (
          <Chip>active</Chip>
        ) : (
          <Chip>active</Chip>
        )

      return {
        id: item.id,
        name: item.name,
        active: (
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