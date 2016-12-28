import React, { Component, PropTypes } from 'react'
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list'
import { Link } from 'redux-little-router'

class Menu extends Component {

  getLink(href, title) {
    return (
      <p>
        <Link href={ href } onClick={ this.props.onClick }>
          { title }
        </Link>
      </p>
    )
  }

  getGuestMenu() {
    return (
      <div>
        {this.getLink('/', 'Home')}
        {this.getLink('/login', 'Login')}
        {this.getLink('/register', 'Register')}
      </div>
    )
  }

  getUserMenu() {
    return (
      <List selectable ripple>
        <ListItem caption="Dashboard" leftIcon="3d_rotation" />
      </List>
      
    )
    /*

    <div>
        {this.getLink('/', 'Dashboard')}
        {this.getLink('/help', 'Help')}
        {this.getLink('/about', 'About')}
        <a href="/auth/v1/logout">Logout</a>
      </div>
      */
  }

  getItem(item, i) {
    if(item.render) return item.render(i)

    let handler = () => {}

    if(item.action) {
      handler = () => this.props.dispatchAction(item.action())
    }
    else if(item.path) {
      handler = () => this.props.redirect(item.path)
    }
    else if(item.handler) {
      handler = item.handler
    }

    return (
      <ListItem 
        key={i}
        caption={item.title}
        leftIcon={item.icon}
        onClick={handler} />
    )
  }

  render() {
    return (
      <List selectable ripple>
        {this.props.items.map(this.getItem.bind(this))}
      </List>
    )
  }

}

Menu.propTypes = {
  items: PropTypes.array.isRequired
}

export default Menu