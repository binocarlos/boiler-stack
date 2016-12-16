import React, { Component, PropTypes } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
//import KettleToolbar from 'kettle-ui/lib/Toolbar'
import KettleToolbar from '../../kettle-ui/Toolbar'

class Toolbar extends Component {

  getIcon() {
    return this.props.getIcon ?
      this.props.getIcon() :
      null
  }

  render() {
    const newProps = Object.assign({}, this.props, {
      leftbuttons:this.props.buttons || [],
      icon:this.getIcon()
    })

    return (
      <KettleToolbar {...newProps}>
        {this.props.children}
      </KettleToolbar>
    )
  }
}

export default muiThemeable()(Toolbar)