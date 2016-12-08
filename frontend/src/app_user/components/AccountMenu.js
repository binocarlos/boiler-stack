import React, { Component, PropTypes } from 'react'

import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import ButtonDropdown from 'kettle-ui/lib/ButtonDropdown'

import { nameSort } from '../../folder-ui/tools'

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

class AccountMenu extends Component {

  getButtonTitle() {
    const currentAccount = this.props.accounts.filter(account => account.littleid == this.props.currentAccount)[0]
    return currentAccount ?
      (currentAccount.name || currentAccount.littleid).toLowerCase() :
      'choose account'
  }

  getAccountMenuItems(closeMenuHandler) {

    let accountList = [].concat(this.props.accounts || [])
    accountList.sort(nameSort)

    return accountList.map((account, i) => {
      return (
        <MenuItem 
          key={i}
          onTouchTap={() => {
            closeMenuHandler && closeMenuHandler()
            this.props.changeAccount(account.littleid)
          }}
          value={account.littleid} 
          primaryText={account.name} />
      )
    })
  }

  getAccountButton() {

    const getDropdownChildren = (closeMenuHandler) => {
      return (
        <Menu>
          {this.getAccountMenuItems(closeMenuHandler)}
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
            {this.getAccountButton()}
          </div>
        </div>
        <div style={STYLES.rightContainer}>
          {this.props.children}  
        </div>
        
      </div>
    )
    
    
  }

}

export default AccountMenu