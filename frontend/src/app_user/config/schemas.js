import React, { Component, PropTypes } from 'react'

const text = (opts = {}) => {
  return {
    name:opts.name || 'name',
    title:opts.title || 'Name'
  }
}

const SCHEMAS = {
  installation:[
    text({
      name:'name',
      title:'Name'
    })
  ]
}

export default SCHEMAS