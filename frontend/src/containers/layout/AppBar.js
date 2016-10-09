import React, { Component, PropTypes } from 'react'
import UIAppBar from 'material-ui/AppBar'

class AppBar extends Component {

  render() {

    return (
      <UIAppBar
        showMenuIconButton={false}
        title="App"
        zDepth={2} />
    )
  }

}

export default AppBar