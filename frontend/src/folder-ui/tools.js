import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'

export const getRouteInfo = (props) => {
  return {
    path:props.route.path,
    params:props.routeParams
  }
}

export const ComponentWrapper = (ComponentClass = Component, opts = {}) => {
  class ComponentClassWrapper extends Component {
    render() {
      const finalProps = Object.assign({}, this.props, opts)
      return <ComponentClass {...finalProps} />
    }
  }

  return ComponentClassWrapper
}

export const ComponentInjector = (ComponentClass = Component, injector) => {
  class ComponentInjectorWrapper extends Component {
    render() {
      const finalProps = Object.assign({}, this.props, injector())
      return <ComponentClass {...finalProps} />
    }
  }

  return ComponentInjectorWrapper
}

export const ContainerWrapper = (ComponentClass = Component, opts = {}) => {
  return class ContainerClassWrapper extends Component {
    componentDidMount() {
      if(opts.initialize) opts.initialize()
    }
    render() {
      const injectedProps = this.props.inject ?
        this.props.inject() :
        {}
      const finalProps = Object.assign({}, this.props, injectedProps)
      return <ComponentClass {...injectedProps} />
    }
  }
  export default connect(
    opts.state,
    null
  )(ContainerClassWrapper)
}

export const serialize = (val) => {
  return JSON.parse(JSON.stringify(val))
}

// item tools
export const getItemName = (item = {}) => {
  return (item.name || '').toLowerCase()
}

export const nameSort = (a, b) => {
  if (getItemName(a) < getItemName(b)) return -1;
  if (getItemName(a) > getItemName(b)) return 1;
  return 0;
}

export const typeSort = (a, b, getItemType) => {
  if (getItemType(a) < getItemType(b)) return -1;
  if (getItemType(a) > getItemType(b)) return 1;
  if (getItemName(a) < getItemName(b)) return -1;
  if (getItemName(a) > getItemName(b)) return 1;
  return 0;
}

export const getLabel = (st = '') => st.replace(/\W/g, '').toLowerCase()


  /*
  
    button groups
    
  */
  const crudButtons = (opts = {}) => {
    const selected = opts.selected || []
    const addAction = opts.addAction
    const editAction = opts.editAction
    const deleteAction = opts.deleteAction
    let items = []
    if(selected.length<=0){
      items.push({
        title: 'Add',
        handler: addAction
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
    const selectAllAction = opts.selectAllAction
    const selectNoneAction = opts.selectNoneAction
    return [{
      title: 'Select All',
      handler:() => opts.selectAllAction
    },{
      title:'Select None',
      handler:() => opts.selectNoneAction
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