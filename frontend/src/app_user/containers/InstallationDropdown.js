import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Dropdown from '../../boiler-ui/lib/components/Dropdown'
import plugins from '../plugins'

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
        label='active company:'
        data={ data }
        onChange={ this.props.onChange }
        value={ this.props.currentInstallation }
      />
    )
    
  }
}

const mapStateToProps = (state, ownProps) => {
  const userData = plugins.user.selectors.status.record(state).data || {}
  return {
    currentInstallation: userData.currentInstallation,
    installations: plugins.installation.table.selectors.items(state)  
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