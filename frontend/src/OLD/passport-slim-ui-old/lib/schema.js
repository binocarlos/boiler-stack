export function validateEmail(val = ''){
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(val) ? null : 'invalid email address'
}

export function validateUsername(val = ''){
  return username.length>0 ? null : 'username must contain characters'
}

export function validatePassword(val = ''){
  if(val.length<8) return 'must be at least 8 chars'
  if(val.match(/\s/)) return 'cannot contain spaces'
  return null
}

export const EMAIL_FIELD = {
  name:'email',
  type:'text',
  validate:validateEmail
}

export const USERNAME_FIELD = {
  name:'username',
  type:'text',
  validate:validateUsername
}

export const PASSWORD_FIELD = {
  name:'password',
  type:'text',
  inputtype:'password',
  validate:validatePassword
}

export const LOGIN_SCHEMA = [
  EMAIL_FIELD,
  PASSWORD_FIELD
]

export const REGISTER_SCHEMA = [
  EMAIL_FIELD,
  PASSWORD_FIELD
]

export const getLoginSchema = (opts = {}) => {
  const primaryKey = opts.primaryKey || 'email'
  return [
    primaryKey == 'email' ?
      EMAIL_FIELD :
      USERNAME_FIELD,
    PASSWORD_FIELD
  ]
}

export const getRegisterSchema = (opts = {}) => {

  const includeEmail = opts.includeEmail ? true : false
  const includeUsername = opts.includeUsername ? true : false
  const extraFields = opts.extraFields || []

  let ret = []

  if(includeUsername) ret.push(USERNAME_FIELD)
  if(includeEmail) ret.push(EMAIL_FIELD)
  ret.push(PASSWORD_FIELD)
  ret = ret.concat(extraFields)
  return ret
}