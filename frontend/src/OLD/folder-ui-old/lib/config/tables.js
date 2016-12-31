import React, { Component, PropTypes } from 'react'

export const text = (opts = {}) => {
  return {
    name:opts.name || 'name',
    title:opts.title || 'Name'
  }
}

export const small = (opts = {}) => {
  const style = Object.assign({}, opts.style, {
    width:'100px'
  })
  return Object.assign({}, opts, {
    style:Object.assign({}, opts.style, {
      width:'100px'
    })
  })
}