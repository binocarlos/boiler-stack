import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'

export const crud = (opts = {}) => {
  deepCheck(opts, [
    'selected',
    'actions.add',
    'actions.edit',
    'actions.delete'
  ])
  const selected = opts.selected
  let items = []
  if(selected.length<=0){
    items.push({
      title: 'Add',
      handler: opts.actions.add
    })
  }
  else if(selected.length==1){
    items.push({
      title: 'Edit',
      handler: opts.actions.edit
    })
  }
  if(selected.length>0 && deleteAction){
    items.push({
      title: 'Delete',
      handler: opts.actions.delete
    })
  }
  return items
}

export const selection = (opts = {}) => {
  deepCheck(opts, [
    'actions.selectAll',
    'actions.selectNone'
  ])
  return [{
    title: 'Select All',
    handler: opts.actions.selectAllAction
  },{
    title:'Select None',
    handler: opts.actions.selectNoneAction
  }]
}

export const form = (opts = {}) => {
  deepCheck(opts, [
    'actions'
  ])

  let buttons = []

  if(opts.actions.cancel){
    buttons.push({
      title: 'Cancel',
      handler: opts.actions.cancel
    })
  }

  if(opts.actions.revert){
    buttons.push({
      title: 'Revert',
      handler: opts.actions.revert
    })
  }

  if(opts.actions.save){
    buttons.push({
      title: 'Save',
      handler: opts.actions.save,
      extraProps:{
        primary:true,
        disabled:opts.saveDisabled
      }
    })
  }

  return buttons
}

export const divider = () => {
  return [{
    divider:true
  }]
}

export const actionDropdown = (opts = {}) => {
  deepCheck(opts, [
    'title',
    'items'
  ])
  return Object.assign({}, opts, {
    type:'dropdown'
  })
}

export const buttonList = (items = []) => {
  return items.map(item => {
    return Object.assign({}, item, {
      type:'button'
    })
  })
}