import React, { Component, PropTypes } from 'react'
import NavWrapper from 'kettle-ui/lib/NavWrapper'
import FolderToolbarWrapper from 'kettle-ui/lib/ToolbarWrapper'

export class ToolbarWrapper extends Component {

  render() {

    const { main, toolbar } = this.props

    return (
      <FolderToolbarWrapper
        offsetWidth={this.props.offsetWidth}
        toolbar={toolbar}
        >

        {main}

      </FolderToolbarWrapper>
    )
  }

}

export class TreeWrapper extends Component {

  render() {

    const { main, sidebar } = this.props

    return (
      <NavWrapper
        width={this.props.width || 200}
        paperprops={{
          zDepth:1,
          rounded:false
        }}
        navbar={sidebar}
        >
        
        {main}

      </NavWrapper>
    )
  }

}