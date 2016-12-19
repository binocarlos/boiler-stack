const MongoCodec = {
  encode:(data) => {
    let ret = Object.assign({}, data, {
      id:data._id
    })
    delete(ret._id)
    delete(ret.__v)
    return ret
  },
  decode:(data) => {
    let ret = Object.assign({}, data)
    ret._id = ret.id
    delete(ret.id)
    return ret
  }
}

export default MongoCodec