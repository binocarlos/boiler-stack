import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FormFields from '../components/FormFields'

export class FormFieldsContainer extends Component {

  componentDidMount() {
    this.props.initialize()
  }

  // loop over the fields array and extract the values
  getFormFields() {
    const fields = this.props.getFields(this.props.data, this.props.meta)
    return fields.map(field => {
      if(!field.get) throw new Error('get method required on field')
      const value = field.get(this.props.data)
      const originalValue = field.get(this.props.originalData)
      const hasChanged = field.compare(value, originalValue) ? false : true
      const meta = (this.props.meta.fields || {})[field.name] || {}
      const error = hasChanged && meta.touched ? meta.error : null

      console.log('-------------------------------------------');
      console.log('error: ' + meta.error)
      console.log('hasChanged: ' + hasChanged)
      console.log('originalValue: ' + originalValue)
      console.log('value: ' + value)
      
      return {
        component: field.component,
        name: field.name,
        title: field.title,
        value,
        error
      }
    })
  }

  render() {
    const componentProps = Object.assign({}, this.props, {
      fields: this.getFormFields()
    })
    return (
      <FormFields {...componentProps} />
    )
  }
}

function mapStateToProps(state, ownProps) {
  if(!ownProps.selector) throw new Error('selector prop required')
  const formData = ownProps.selector(state)
  return {
    data: formData.data,
    originalData: formData.originalData,
    meta: formData.meta
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  if(!ownProps.initializeAction) throw new Error('initialize prop required')
  if(!ownProps.updateAction) throw new Error('update prop required')
  if(!ownProps.touchAction) throw new Error('touch prop required')
  return {
    initialize: () => {
      dispatch(ownProps.initializeAction())
    },
    update: (name, value) => {
      dispatch(ownProps.updateAction(name, value))
    },
    touch: (name) => {
      dispatch(ownProps.touchAction(name))
    }
  }
}

FormFieldsContainer.propTypes = {
  getFields: PropTypes.func.isRequired,
  selector: PropTypes.func.isRequired
}

FormFieldsContainer.defaultProps = {
  
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormFieldsContainer)