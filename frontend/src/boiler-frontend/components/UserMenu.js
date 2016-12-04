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
    const menuItems = this.props.settings.getUserMenu ? this.props.settings.getUserMenu() : null
    return menuItems.length <= 0 ? null : (
      <IconMenu
        iconButtonElement={
          <IconButton iconStyle={STYLES.button}><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {(menuItems || []).map((item, i) => {

          let itemHandler = item.handler
          if(!itemHandler) {
            itemHandler = () => {
              if(item.linkTo) this.props.changeLocation(item.linkTo)
            }
          }

          return (
            <MenuItem 
              key={i}
              onClick={itemHandler}
              primaryText={item.label} />
          )
        })}
      </IconMenu>
    )
  }

  render() {
    if(this.props.openAccess){
      return this.getUserMenu()
    }
    else{
      return this.props.user ?
        this.getUserMenu() :
        this.getLoginButton()
    }
  }
}

export default UserMenu