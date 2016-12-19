import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

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
      return <ComponentClass {...this.props} />
    }
  }
  export default connect(
    opts.state,
    opts.dispatch
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