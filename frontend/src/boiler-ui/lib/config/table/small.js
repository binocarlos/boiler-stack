const small = (opts = {}) => {
  const style = Object.assign({}, opts.style, {
    width:'100px'
  })
  return Object.assign({}, opts, {
    style:Object.assign({}, opts.style, {
      width:'100px'
    })
  })
}

export default small