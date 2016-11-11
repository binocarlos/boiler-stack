import React, { PropTypes, Component } from 'react'
import TextField from 'material-ui/TextField';

class NumberField extends Component {

  handleChange(e) {
    const stringVal = e.target.value
    let numberVal = isNaN(parseFloat(stringVal)) ?
      stringVal :
      parseFloat(stringVal)

    // they are in the middle of writing a number keep the string
    if(stringVal.match(/\.$/)) numberVal = stringVal
    if(stringVal.match(/-$/)) numberVal = stringVal
    this.props.update(numberVal)
  }

  handleBlur(e) {
    this.props.blur()
  }
  
  render() {
    var errorDiv = this.props.dirty && !this.props.valid ? (
      <div>{this.props.error || ''}</div>
    ) : null

    return (
      <TextField 
        value={this.props.value || ''} 
        disabled={this.props.schema.readonly ? true : false}
        errorText={errorDiv} 
        width={100}
        type="text"
        floatingLabelText={this.props.title} 
        onChange={this.handleChange.bind(this)} 
        onBlur={this.handleBlur.bind(this)} />
    )
  }

}

export default NumberField