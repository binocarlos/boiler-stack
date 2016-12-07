import React, { Component, PropTypes } from 'react'

import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import MenuItem from 'material-ui/MenuItem'

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
  render() {
    const menuItems = this.props.items || []
    return menuItems.length <= 0 ? null : (
      <IconMenu
        iconButtonElement={
          <IconButton iconStyle={STYLES.button}><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        {(menuItems || []).map((item, i) => {
          return (
            <MenuItem 
              key={i}
              onClick={item.handler}
              primaryText={item.label} />
          )
        })}
      </IconMenu>
    )
  }
}

export default UserMenu