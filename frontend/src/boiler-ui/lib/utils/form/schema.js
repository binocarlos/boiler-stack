import immutable from 'object-path-immutable'

// utility model to represent an array of form schema fields
// the only state a schema object keeps is about it's fields
// no data or meta is kept internally
const Schema = (fields = [], settings = {}) => {

  const overallValidate = settings.validate

  const getDefaultMeta = () => {
    return {
      valid: true,
      touched: false,
      error: null
    }
  }
  // inject the initial value yielded by each field
  const fieldMap = fields.reduce((all, field) => {
    all[field.name] = field
    return all
  }, {})

  const getInitialData = (data = {}) => {
    return fields.reduce((all, field) => {
      if(!field.getInitial) return all
      const currentValue = field.get(data)
      if(typeof(currentValue) != 'null' && typeof(currentValue) != 'undefined') return all
      const initialValue = field.getInitial(data)
      return field.set(field.getInitial(data), all)
    }, data)
  }

  // generate a meta report based on the given data/meta
  const getMeta = (data = {}, meta = {}) => {
    const fieldMeta = fields.reduce((all, field) => {
      let fieldMeta = all[field.name] || getDefaultMeta()
      const currentValue = field.get(data)
      const error = field.validate ?
        field.validate(currentValue, data) :
        null

      fieldMeta.valid = error ? false : true
      fieldMeta.error = error

      all[field.name] = fieldMeta

      return all
    }, {})

    let overallError = overallValidate ?
      overallValidate(data) :
      null
    
    return {
      custom_valid: overallError ? false : true,
      custom_error: overallError,
      fields: fieldMeta
    }
  }

  // inject the new value and return new data and meta
  const updateField = (name, value, data = {}, meta = {}) => {
    const field = fieldMap[name]
    if(!field) throw new Error('field ' + name + ' not found')
    const updatedData = field.set(value, data)
    return {
      data: updatedData,
      meta: getMeta(updatedData, meta)
    }
  }

  // update a field meta as touched
  const touchField = (name, meta = {}) => {
    let fieldMeta = meta.fields[name] || getDefaultMeta()
    fieldMeta.touched = true
    return immutable.set(meta, 'fields.' + name, fieldMeta)
  }

  return {
    initialData: getInitialData,
    meta: getMeta,
    update: updateField,
    touch: touchField
  }
}

export default Schema