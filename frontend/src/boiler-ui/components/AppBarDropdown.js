import React, { Component, PropTypes } from 'react'

import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import ButtonDropdown from 'kettle-ui/lib/ButtonDropdown'

const STYLES = {
  button:{
    backgroundColor: 'transparent',
    color: 'white'
  },
  leftContainer:{
    float:'left'
  },
  rightContainer:{
    float:'right'
  },
  padding:{
    paddingTop:'5px' 
  }
}

class AppBarDropdown extends Component {

  getItemId(item = {}) {
    const field = this.props.idField || 'id'
    return item[field]
  }

  getItemName(item = {}) {
    return (item.name || this.getItemId(item)).toLowerCase()
  }

  getButtonTitle() {
    const currentItem = this.props.items.filter(item => this.getItemId(item) == this.props.currentItem)[0]
    return currentItem ?
      this.getItemName(currentItem) :
      (this.props.chooseTitle || 'choose item')
  }

  getMenuItems(closeMenuHandler) {

    const itemList = this.props.items || []

    return itemList.map((item, i) => {
      return (
        <MenuItem 
          key={i}
          onTouchTap={() => {
            closeMenuHandler && closeMenuHandler()
            this.props.changeItem(this.getItemId(item))
          }}
          value={this.getItemId(item)} 
          primaryText={this.getItemName(item)} />
      )
    })
  }

  getButton() {

    const getDropdownChildren = (closeMenuHandler) => {
      return (
        <Menu>
          {this.getMenuItems(closeMenuHandler)}
        </Menu>
      )
    }

    return (
      <ButtonDropdown
        getChildren={getDropdownChildren}
        buttonclass={FlatButton}
        buttonprops={{
          label:this.getButtonTitle(),
          labelStyle:{
            textTransform:'none'
          },
          labelPosition:'before',
          style:STYLES.button,
          icon:<ExpandMoreIcon />
        }} />
    )
  }

  render() {
    return (
      <div>
        <div style={STYLES.leftContainer}>
          <div style={STYLES.padding}>
            {this.getButton()}
          </div>
        </div>
        <div style={STYLES.rightContainer}>
          {this.props.children}  
        </div>
        
      </div>
    )
    
    
  }

}

export default AppBarDropdown