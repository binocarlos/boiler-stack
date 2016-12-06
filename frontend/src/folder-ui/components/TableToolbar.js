import React, { Component, PropTypes } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Toolbar from 'kettle-ui/lib/Toolbar'

class ActionToolbar extends Component {

  getButtons() {

    const buttons = this.props.buttons || []
    const actions = this.props.actions

    if(actions.length>0){
      buttons.push({
        id:'actions',
        type:'dropdown',
        title:this.props.actionButtonTitle || 'Actions',
        items:actions
      })
    }

    return buttons
  }

  render() {
    const newProps = Object.assign({}, this.props, {
      leftbuttons:this.getButtons(),
      icon:this.props.getIcon()
    })

    return (
      <Toolbar {...newProps}>
        {toolbarChildren}
      </Toolbar>
    )
  }
}

export default muiThemeable()(ActionToolbar)