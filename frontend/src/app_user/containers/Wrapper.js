import React, { Component } from 'react'
import AppBar from '../../boiler-ui/lib/components/AppBar'

class Wrapper extends Component {
  render() {
    return (
      <div>
        <AppBar
          title="My Apples"
          leftIcon="menu"
        />        
        {this.props.children}
      </div>
    )
  }
}

export default Wrapper