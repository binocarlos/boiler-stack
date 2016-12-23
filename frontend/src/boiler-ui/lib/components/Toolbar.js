import React, { Component, PropTypes } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
//import KettleToolbar from 'kettle-ui/lib/Toolbar'
import KettleToolbar from '../../../kettle-ui/lib/Toolbar'

class Toolbar extends Component {

  render() {
    const injectProps = this.props.injectProps ?
      this.props.injectProps() :
      {}

    const newProps = Object.assign({}, this.props, injectProps)

    return (
      <KettleToolbar {...newProps} />
    )
  }
}

export default muiThemeable()(Toolbar)