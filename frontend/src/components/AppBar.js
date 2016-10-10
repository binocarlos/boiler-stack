import React, { Component, PropTypes } from 'react'
import UIAppBar from 'material-ui/AppBar'

export class AppBar extends Component {
  render() {
    return (    
      <UIAppBar
        showMenuIconButton={false}
        title={this.props.title}
        zDepth={2} />
    )
  }
}

export default AppBar