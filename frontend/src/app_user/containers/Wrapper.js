import React, { Component } from 'react'

class Wrapper extends Component {
  render() {
    return (
      <div>
      this is the wrapper 2
        {this.props.children}
      </div>
    )
  }
}

export default Wrapper