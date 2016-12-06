import React, { Component, PropTypes } from 'react'
import NavWrapper from 'kettle-ui/lib/NavWrapper'
import FolderToolbarWrapper from 'kettle-ui/lib/ToolbarWrapper'

export class ToolbarWrapper extends Component {

  render() {
    return (
      <FolderToolbarWrapper
        offsetWidth={this.props.offsetWidth}
        toolbar={this.props.toolbar}
        >

        {this.props.children}

      </FolderToolbarWrapper>
    )
  }

}

export class TreeWrapper extends Component {

  render() {

    return (
      <NavWrapper
        width={this.props.width || 200}
        paperprops={{
          zDepth:1,
          rounded:false
        }}
        navbar={this.props.tree}
        >
        
        {this.props.children}

      </NavWrapper>
    )
  }

}