import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'

import Snackbar from 'material-ui/Snackbar'

import {
  close_snackbar
} from '../actions'

import {
  snackbar
} from '../selectors'

export class SnackbarContainer extends Component {
  render() {
    return (
      <Snackbar
        open={this.props.open}
        message={this.props.message}
        autoHideDuration={this.props.duration || 4000}
        onRequestClose={this.hide}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  const selector = snackbar(state)
  return {
    open:selector.open(),
    message:selector.message()
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    hide:() => {
      dispatch(close_snackbar())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackbarContainer)
