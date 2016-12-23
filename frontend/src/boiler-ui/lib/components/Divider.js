import React, { PropTypes, Component } from 'react'

const STYLES = {
  hr:{
    marginTop:'30px',
    marginBottom:'30px',
    borderTop:'1px dashed #ccc',
    height:'1px'
  }
}

class Divider extends Component {

  render() {

    return (
      <div style={STYLES.hr} />
    )
  }
}

export default Divider