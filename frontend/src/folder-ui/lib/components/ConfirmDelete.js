import React, { PropTypes, Component } from 'react'
import ConfirmDialog from '../../../kettle-ui/lib/ConfirmDialog'

class ConfirmDelete extends Component {

  render() {
    return (
      <ConfirmDialog
        onClose={this.props.onClose}
        onConfirm={this.props.onConfirm}
        isModal={true}
        isOpen={this.props.open}
      >
        Are you sure you want to delete { this.props.count } { this.props.count == 1 ? this.props.title : this.props.pluralTitle }?
      </ConfirmDialog>
    )
  }
}

export default ConfirmDelete