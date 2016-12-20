import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'

export const crud = (opts = {}) => {
  deepCheck(opts, [
    'selected',
    'add',
    'edit',
    'delete'
  ])
  const selected = opts.selected
  let items = []
  if(selected.length<=0){
    items.push({
      title: 'Add',
      handler: opts.add
    ))
  }
  else if(selected.length==1){
    items.push({
      title: 'Edit',
      handler: opts.edit
    ))
  }
  if(selected.length>0 && deleteAction){
    items.push({
      title: 'Delete',
      handler: opts.delete
    })
  }
  return items
}

export const selection = (opts = {}) => {
  deepCheck(opts, [
    'selectAll',
    'selectNone'
  ])
  return [{
    title: 'Select All',
    handler: opts.selectAllAction
  },{
    title:'Select None',
    handler: opts.selectNoneAction
  }]
}

export const actionDropdown = (opts = {}) => {
  deepCheck(opts, [
    'title',
    'items'
  ])
  return {
    type:'dropdown',
    opts.title,
    opts.items
  }
}

export const buttonList = (items = []) => {
  return items.map(item => {
    return Object.assign({}, item, {
      type:'button'
    })
  })
}