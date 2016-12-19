import React, { Component, PropTypes } from 'react'
import actions from '../actions'

const ButtonTools = (store) => {

  /*
  
    single buttons
    
  */
  const redirectButton = (title, route) => {
    return {
      title: title,
      handler: () => store.dispatch(actions.router.redirect(route))
    }
  }

  /*
  
    button groups
    
  */
  const crudButtons = (opts = {}) => {
    const selected = opts.selected || []
    const routes = opts.routes || {}
    const deleteAction = opts.deleteAction
    let items = []
    if(selected.length<=0){
      items.push(redirectButton(
        'Add',
        routes.add
      ))
    }
    else if(selected.length==1){
      items.push(redirectButton(
        'Edit',
        routes.edit + '/' + selected[0]
      ))
    }
    if(selected.length>0 && deleteAction){
      items.push({
        title: 'Delete',
        handler: () => store.dispatch(deleteAction())
      })
    }
    return items
  }

  const selectButtons = (opts = {}) => {
    const ids = opts.ids || []
    const selectAction = opts.selectAction
    return [{
      title: 'Select All',
      handler:() => store.dispatch(selectAction(ids))
    },{
      title:'Select None',
      handler:() => store.dispatch(selectAction([]))
    }]
  }

  const actionDropdown = (items = [], title = 'Actions') => {
    return {
      type:'dropdown',
      title,
      items
    }
  }

  const buttonList = (items = []) => {
    return items.map(item => {
      return Object.assign({}, item, {
        type:'button'
      })
    })
  }

  return {
    redirectButton,
    crudButtons,
    selectButtons,
    actionDropdown,
    buttonList
  }
}

export default ButtonTools