import React, { Component, PropTypes } from 'react'
import { AppBar } from 'react-toolbox/lib/app_bar'

class MainAppBar extends Component {
  render() {
    return (
      <AppBar 
        title={this.props.title}
        leftIcon={this.props.leftIcon}
        theme={this.props.theme}
        flat 
        fixed
      >
        {this.props.children}
      </AppBar>
    )
  }
}

MainAppBar.propTypes = {
  title: PropTypes.string.isRequired,
  leftIcon: PropTypes.string
}

export default MainAppBar