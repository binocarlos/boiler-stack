import React, { Component, PropTypes } from 'react'
import MenuItem from 'material-ui/MenuItem'

export class Menu extends Component {
  render() {
    const items = this.props.items || []
    return (
      <div>
        {items.map((item, i) => {

          const icon = item.icon ? (
            <item.icon />
          ) : null
          
          return (
            <MenuItem leftIcon={icon} key={i} onTouchTap={item.handler}>
              {item.label}
            </MenuItem>
          )
        })}
      </div>
    )
  }
}

export default Menu