import React, { Component, PropTypes } from 'react'

const text = (opts = {}) => {
  return {
    name:opts.name || 'name',
    title:opts.title || 'Name'
  }
}

const smalltext = (opts = {}) => {
  return Object.assign({}, text(opts), {
    style:{
      width:'100px'
    }
  })
}

const TABLES = {
  installation:[
    text({
      name:'name',
      title:'Name'
    }),
    smalltext({
      name:'littleid',
      title:'ID'
    })
  ]
}

export default TABLES