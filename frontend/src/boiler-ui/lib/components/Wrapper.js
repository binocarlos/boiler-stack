import React, { Component, PropTypes } from 'react'

class Wrapper extends Component {

  render() {

    return (
      <div>
        {this.props.children}
      </div>
    )
  }

}

export default Wrapper