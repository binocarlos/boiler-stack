import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import AppBarDropdown from './AppBarDropdown'

class InstallationMenu extends Component {

  render() {
    if(this.props.items.length <= 0) return this.props.children

    const items = state.items || []
  
    items.push({
      name:ownProps.editTitle || 'edit installations',
      id:'edit'
    })

    const useProps = Object.assign({}, this.props, {
      items,
      changeItem:(id) => {
        if(id == this.props.currentItem) return
        if(id == 'edit'){
          this.props.editInstallations(this.props.router.location.pathname)
        }
        else {
          this.props.changeInstallation(id)  
        }
      }
    })

    return (
      <AppBarDropdown {...useProps} />
    )
  }
}

export default withRouter(InstallationMenu)
