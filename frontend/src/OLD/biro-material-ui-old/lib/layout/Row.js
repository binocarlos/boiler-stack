import React, { PropTypes, Component } from 'react'

class RowLayout extends Component {

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }

}

export default RowLayout

