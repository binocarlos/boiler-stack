export const action = (type, payload = {}) => {
  return {type, ...payload}
}

export const getTypes = (base, types) => {
  return types.reduce((acc, type) => {
    acc[type] = `${base}_${type}`
    return acc
  }, {})
}
