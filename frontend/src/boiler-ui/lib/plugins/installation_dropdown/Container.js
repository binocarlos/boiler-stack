import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dropdown from '../../components/Dropdown'

class InstallationDropdown extends Component {

  render() {
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
  const userData = ownProps.selectors.userdata(state).data || {}
  const installations = ownProps.selectors.installations(state)  
  return {
    currentInstallation: userData.currentInstallation,
    installations
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (val) => console.log(val)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstallationDropdown)