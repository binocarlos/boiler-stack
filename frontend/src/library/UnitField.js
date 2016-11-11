import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'

import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const UNITS = [
  'm',
  'm2',
  'm3',
  'kg',
  'ton',
  'hour',
  'day',
  'week',
  'month',
  'money',
  'bag',
  'each'
]
class UnitField extends Component {

  handleChange = (event, index, value) => this.props.update(value)

  render() {

    return (
      <SelectField
        floatingLabelText={this.props.title}
        value={this.props.value}
        onChange={this.handleChange}
      >
      {
        UNITS.map((unit, i) => {
          return (
            <MenuItem 
              key={i}
              value={unit} 
              primaryText={unit} />
          )
        })
      }
      </SelectField>
    )
  }
}

export default UnitField