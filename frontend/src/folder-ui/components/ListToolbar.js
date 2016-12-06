import React, { Component, PropTypes } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Toolbar from 'kettle-ui/lib/Toolbar'

class ListToolbar extends Component {

  getButtons() {

    const buttons = []
    const actions = this.props.getActions()

    if(actions.length>0){
      buttons.push({
        id:'actions',
        type:'dropdown',
        title:this.props.actionButtonTitle || 'Actions',
        items:actions
      })
    }

    buttons = this.props.getExtraButtons ?
      buttons.concat(this.props.getExtraButtons()) :
      buttons

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

export default muiThemeable()(ListToolbar)