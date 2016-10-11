import React, { Component, PropTypes } from 'react'
import { layout } from '../styles'

/*

  wrapper component for pages that have a margin around them
  
*/
class Page extends Component {

  render() {

    return (
      <div style={layout.paddedContent}>
        {this.props.children}
      </div>
    )
  }

}

export default Page