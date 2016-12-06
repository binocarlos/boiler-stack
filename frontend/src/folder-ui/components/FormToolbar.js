import React, { Component, PropTypes } from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Toolbar from 'kettle-ui/lib/Toolbar'

class FormToolbar extends Component {

  getButtons() {

    const cancelButton = {
      id:'cancel',
      title:'Cancel',
      handler:() => {
        this.props.cancel()
      }
    }

    const revertButton = {
      id:'revert',
      title:'Revert',
      handler:() => {
        this.props.revert()
      }
    }

    const saveButton = {
      id:'save',
      title:this.props.saveTitle || 'Save',
      extraProps:{ 
        primary:true
      },
      handler:() => {
        this.props.save()
      }
    }

    return this.props.readOnly ?
      [
        cancelButton
      ] :
      [
        cancelButton,
        revertButton,
        saveButton
      ]
  }

  getIcon() {
    return this.props.getIcon ?
      this.props.getIcon() :
      null
  }

  render() {
    const newProps = Object.assign({}, this.props, {
      leftbuttons:this.getButtons(),
      icon:this.getIcon()
    })

    return (
      <Toolbar {...newProps}>
        {toolbarChildren}
      </Toolbar>
    )
  }
}

export default muiThemeable()(FormToolbar)