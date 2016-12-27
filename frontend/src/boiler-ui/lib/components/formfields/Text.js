import React, { PropTypes, Component } from 'react'
import Input from 'react-toolbox/lib/input'

class Text extends Component {

  render() {
    return (
      <Input 
        type='text' 
        label={ this.props.title } 
        value={ this.props.value } 
        onChange={ this.props.update }
      />
    )
  }
}

Text.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  update: PropTypes.func.isRequired
}

Text.defaultProps = {
  
}

export default Text