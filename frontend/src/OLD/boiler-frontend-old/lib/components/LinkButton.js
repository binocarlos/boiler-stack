import React, { Component, PropTypes } from 'react'
import FlatButton from 'material-ui/FlatButton'

const STYLES = {
  button:{
    backgroundColor: 'transparent',
    color: 'white'
  },
  buttonContainer:{
    paddingTop:'4px'
  }
}
class LinkButton extends Component {
  render() {
    return (
      <div style={STYLES.buttonContainer}>
        <FlatButton 
          style={STYLES.button}
          onClick={() => this.props.onClick()}
          label={this.props.title} />
      </div>
    )
  }
}

export default LinkButton