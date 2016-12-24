const requiredFns = {
  string: (len = 1) => (val) => val.length >= len,
  number: (min = 0) => (val) => val >= min
}

const required = (opts = {}) => {
  const string = requiredFns.string(opts.min)
  const number = requiredFns.number(opts.min)

  return (val, data = {}) => {
    if(typeof(val) === 'string') return string(val)
    if(typeof(val) === 'number') return number(val)
    return val ? null : 'required'
  }
}

const argumentParsers = {
  required: (args = []) => {
    return {
      min: args[0]
    }
  }
}

// turn required:5 into {type:'required', opts:{min:5}}
const processValidatorString = (string) => {
  const parts = string.split(':')
  const type = parts.shift()

  const opts = argumentParsers[type] ?
    argumentParsers[type].apply(null, [parts]) :
    {}

  return {
    type,
    opts
  }
}

const validators = {
  required
}

const getValidators = (validate) => {
  if(!validate) return []
  if(typeof(validate) == 'string') {
    const { type, opts } = processValidatorString(validate)
    if(!validators[type]) return []
    return [
      validators[type].apply(null, [opts])
    ]
  }
  else if(typeof(validate) == 'function') {
    return [
      validate
    ]
  }
  else if(validate.constructor === Array) {
    return validate.reduce((all, v) => {
      return all.concat(getValidators(v))
    }, [])
  }
  else if(validate.constructor === Object) {
    return Object.keys(validate).reduce((all, key) => {
      if(!validators[key]) return all
      return all.concat([
        validators[key].apply(null, [validate[key]])
      ])
    }, [])
  }
}

const validator = (validate) => {

  const validators = getValidators(validate)

  return (value, data = {}) => {
    const errors = validators
      .map(validator => )
  }
}