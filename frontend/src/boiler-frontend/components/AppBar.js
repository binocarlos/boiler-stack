import React, { Component, PropTypes } from 'react'
import UIAppBar from 'material-ui/AppBar'

export class AppBar extends Component {

  render() {

    const titleStyle = this.props.titlebarClickUrl ?
      {cursor:'pointer'} :
      null

    return (
      <UIAppBar
        showMenuIconButton={this.props.hasMenu ? true : false}
        title={this.props.title}
        iconElementRight={this.props.children}
        onTitleTouchTap={() => {
          if(this.props.titlebarClickUrl) this.props.changeLocation(this.props.titlebarClickUrl)
        }}
        onLeftIconButtonTouchTap={() => this.props.toggleMenu(true)}
        titleStyle={titleStyle}
        zDepth={2} />
    )
  }
}

export default AppBar