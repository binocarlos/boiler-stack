import React, { Component, PropTypes } from 'react'
import Navigation from 'react-toolbox/lib/navigation'
import Button from 'react-toolbox/lib/button'

import Layout from '../Layout'
import ButtonMenu from '../ButtonMenu'

class FormToolbar extends Component {

  render() {

    const panelBarContent = (
      <Navigation type='horizontal'>
        <Button
          label={this.props.cancelTitle}
          icon={this.props.cancelIcon}
          onClick={this.props.onCancel}
          ripple={false}
        />
        <Button
          label={this.props.revertTitle}
          icon={this.props.revertIcon}
          onClick={this.props.onRevert}
          ripple={false}
        />
        <Button
          label={this.props.saveTitle}
          icon={this.props.saveIcon}
          onClick={this.props.onSave}
          raised={this.props.valid} 
          primary={this.props.valid}
          ripple={false}
        />
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

FormToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  cancelTitle: PropTypes.string,
  cancelIcon: PropTypes.string,
  revertTitle: PropTypes.string,
  revertIcon: PropTypes.string,
  saveTitle: PropTypes.string,
  saveIcon: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onRevert: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired
}

FormToolbar.defaultProps = {
  cancelTitle: 'Cancel',
  cancelIcon: 'cancel',
  revertTitle: 'Revert',
  revertIcon: 'cached',
  saveTitle: 'Save',
  saveIcon: 'check_circle'
}

export default FormToolbar