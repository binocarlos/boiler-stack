import React, { Component, PropTypes } from 'react'

/*

  get the rows in a table that are selected
  
*/
export const getSelectedTableRows = (table) => {
  table = table || {}
  return (table.list || []).filter(id => {
    return table.data[id]._selected
  }).map(id => {
    return table.data[id]
  })
}

/*

  get the rows in a table
  
*/
export const getTableRows = (table) => {
  table = table || {}
  return (table.list || []).map(id => {
    return table.data[id]
  })
}

export const ContainerWrapper = (ComponentClass = Component, opts = {}) => {
  return class ContainerClass extends Component {
    render() {
      const finalProps = Object.assign({}, this.props, opts)
      return <ComponentClass {...finalProps} />
    }
  }
}

/*

  the simplest component that includes the children
  used for the nested-route setup we have
  
*/
export class ChildrenWrapper extends Component {

  render() {
    return this.props.children
  }

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

/*

  for digger items use the tag
  for storage items the mongo db will inject a _type property
  
*/
export const getItemType = (item = {}) => {
  const type = item._digger ?
    item._digger.tag :
    item._type
  return (type || item.type).toLowerCase()
}

export const typeSort = (a, b) => {
  if (getItemType(a) < getItemType(b)) return -1;
  if (getItemType(a) > getItemType(b)) return 1;
  if (getItemName(a) < getItemName(b)) return -1;
  if (getItemName(a) > getItemName(b)) return 1;
  return 0;
}

export const getLabel = (st = '') => st.replace(/\W/g, '').toLowerCase()