const text = (opts = {}) => {
  return {
    name:opts.name || 'name',
    title:opts.title || 'Name'
  }
}

export default text