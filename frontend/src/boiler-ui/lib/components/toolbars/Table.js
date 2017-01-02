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
        label={this.props.addTitle}
        icon={this.props.addIcon}
        onClick={this.props.onAdd}
        ripple={false}
      />
    )
  }

  getActionsButton() {
    if(!this.props.buttonActions || this.props.buttonActions.length <= 0) return
    return (
      <ButtonMenu
        redirect={this.props.redirect}
        buttonProps={{
          label: this.props.actionTitle,
          icon: this.props.actionIcon,
          ripple: false
        }}
        items={this.props.buttonActions}
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

TableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  actionTitle: PropTypes.string,
  actionIcon: PropTypes.string,
  addTitle: PropTypes.string,
  addIcon: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
  redirect: PropTypes.func.isRequired
}

TableToolbar.defaultProps = {
  actionTitle: 'Actions',
  actionIcon: 'more_vert',
  addTitle: 'Add',
  addIcon: 'add'
}

export default TableToolbar