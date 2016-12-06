// basic edit functions for the toolbar

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

export default muiThemeable()(FormToolbar)