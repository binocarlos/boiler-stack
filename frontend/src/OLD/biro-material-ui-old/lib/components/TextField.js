import React, { PropTypes, Component } from 'react'
import TextField from 'material-ui/TextField';

class TextFieldComponent extends Component {

  handleChange(e) {
    this.props.update(e.target.value)
  }

  handleBlur(e) {
    this.props.blur()
  }
  
  render() {
    var errorDiv = this.props.dirty && !this.props.valid ? (
      <div>{this.props.error || ''}</div>
    ) : null

    var type = this.props.schema.inputtype || 'text'

    return (
      <TextField 
        value={this.props.value || ''} 
        fullWidth 
        disabled={this.props.schema.readonly ? true : false}
        type={type} 
        errorText={errorDiv} 
        floatingLabelText={this.props.title} 
        onChange={this.handleChange.bind(this)} 
        onBlur={this.handleBlur.bind(this)} />
    )
  }

}

export default TextFieldComponent