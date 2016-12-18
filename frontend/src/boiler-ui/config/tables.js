import React, { Component, PropTypes } from 'react'
import ActiveInstallationWrapper from '../containers/ActiveInstallationWrapper'

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

export const installationStatus = (opts = {}) => {
  return {
    title:opts.title || 'Status',
    render:(data, field) => {
      return (
        <ActiveInstallationWrapper id={data.id}>
          active
        </ActiveInstallationWrapper>
      )
    }
  }
}

export const tables = {
  installation:[
    text({
      name:'name',
      title:'Name'
    }),
    small(text({
      name:'littleid',
      title:'ID'
    })),
    small(installationStatus())
  ]
}

export default tables