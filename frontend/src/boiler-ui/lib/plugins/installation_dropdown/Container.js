import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dropdown from '../../components/Dropdown'

class InstallationDropdown extends Component {

  render() {

    if(!this.props.active) {
      return (
        <div></div>
      )
    }
    const data = this.props.installations.map(item => {
      return {
        value: item.id,
        label: item.name
      }
    })
    return (
      <Dropdown
        white
        label={ 'active ' + (this.props.title || 'installation') }
        data={ data }
        onChange={ this.props.onChange }
        value={ this.props.currentInstallation }
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const userData = ownProps.selectors.userdata(state) || {}
  const userRecord = ownProps.selectors.userrecord(state)
  const installations = ownProps.selectors.installations(state)
  return {
    active: userRecord.loggedIn ? true : false,
    currentInstallation: userData.currentInstallation,
    installations
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (val) => dispatch(ownProps.actions.trigger(val))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallationDropdown)