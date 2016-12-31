import React, { Component, PropTypes } from 'react'
import Navigation from 'react-toolbox/lib/navigation'
import Button from 'react-toolbox/lib/button'

import Layout from '../Layout'
import ButtonMenu from '../ButtonMenu'

class TableToolbar extends Component {

  getAddButton() {
    if(!this.props.onAdd) return
    return (
      <Button
        label='Add'
        icon='add'
        onClick={this.props.onAdd}
      />
    )
  }

  getActionsButton() {
    if(!this.props.actions || this.props.actions.length <= 0) return
    return (
      <ButtonMenu
        redirect={this.props.redirect}
        buttonProps={{
          label: 'Actions',
          icon: 'more_vert'
        }}
        items={this.props.actions}
      />
    )
  }

  render() {

    const panelBarContent = (
      <Navigation type='horizontal'>
        {this.getAddButton()}
        {this.getActionsButton()}
      </Navigation>
    )

    return (
      <Layout
        panelBarContent={panelBarContent}
        panelBarProps={{
          title: this.props.title,
          flat: true,
          leftIcon: this.props.icon
        }}
      >
        {this.props.children}
      </Layout>
    )
  }

}

export default TableToolbar