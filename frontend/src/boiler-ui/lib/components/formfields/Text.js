import React, { PropTypes, Component } from 'react'
import Input from 'react-toolbox/lib/input'

class Text extends Component {

  render() {
    return (
      <Input 
        type='text' 
        label={ this.props.title } 
        name={ this.props.name }
        value={ this.props.value } 
        onChange={ this.props.onChange }
      />
    )
  }
}

Text.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

Text.defaultProps = {
  
}

export default Text