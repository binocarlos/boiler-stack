/*

  * update(name, value)
  * touch(name)
  * fields[] - an array of form fields:
    * component
    * name
    * title
    * value
    * error

      
*/
import React, { PropTypes, Component } from 'react'

class FormFields extends Component {

  render() {
    const { fields, update, touch } = this.props
    return (
      <div>
        {
          fields.map((field, i) => {
            const FieldComponent = field.component
            return (
              <div key={i}>
                <FieldComponent
                  title={field.title}
                  error={field.error}
                  value={field.value}
                  update={value => this.props.update(field.name, value)}
                  touch={() => this.props.touch(field.name)}
                />
              </div>
            )
          })
        }
      </div>
    )
  }
}

FormFields.propTypes = {
  fields: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
  touch: PropTypes.func.isRequired
}

FormFields.defaultProps = {
  
}

export default FormFields