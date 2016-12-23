import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'

export class SnackbarContainer extends Component {
  render() {
    return (
      <div>snackbar</div>
    )
    /*
    return (
      <Snackbar
        open={this.props.open}
        message={this.props.message}
        autoHideDuration={this.props.duration}
        onRequestClose={this.hide}
      />
    )*/
  }
}

function mapStateToProps(state, ownProps) {
  const toggleState = state[ownProps.reducerName]
  return {
    open: toggleState.open,
    message: toggleState.payload
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClose:() => {
      dispatch(ownProps.onClose())
    }
  }
}

SnackbarContainer.propTypes = {
  open: PropTypes.bool,
  message: PropTypes.string,
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired
}

SnackbarContainer.defaultProps = {
  open: false,
  message: '',
  duration: 4000
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnackbarContainer)
