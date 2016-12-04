import React, { Component, PropTypes } from 'react'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'

const STYLES = {
  button:{
    backgroundColor: 'transparent',
    color: 'white'
  },
  buttonContainer:{
    paddingTop:'4px'
  }
}
export class UserMenu extends Component {

  getLoginButton() {
    return (
      <div style={STYLES.buttonContainer}>
        <FlatButton 
          style={STYLES.button}
          onClick={() => this.props.changeLocation('/login')}
          label="Login" />
      </div>
    )
  }

  getUserMenu() {

    const extraItems = this.props.settings.getUserMenuItems()
    
    return (
      <IconMenu
        iconButtonElement={
          <IconButton iconStyle={STYLES.button}><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem 
          onClick={() => this.props.changeLocation('/help')}
          primaryText="Help" />
        {extraItems}
      </IconMenu>
    )
  }

  render() {

    if(this.props.openAccess){
      return null
    }
    
    return this.props.user ?
      this.getUserMenu() :
      this.getLoginButton()
  }
}

export default UserMenu