import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'

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
      const finalProps = Object.assign({}, this.props, injector(this.props))
      return <ComponentClass {...finalProps} />
    }
  }

  return ComponentInjectorWrapper
}

export const ContainerWrapper = (ComponentClass = Component, opts = {}) => {
  return class ContainerClassWrapper extends Component {
    componentDidMount() {
      if(opts.initialize) opts.initialize(this.props)
    }
    render() {
      const injectedProps = this.props.injectProps ?
        this.props.injectProps(this.props) :
        {}
      const finalProps = Object.assign({}, this.props, injectedProps)
      return <ComponentClass {...finalProps} />
    }
  }
  export default connect(
    opts.getState,
    null
  )(ContainerClassWrapper)
}

export const getRouteInfo = (props) => {
  return {
    path:props.route ? props.route.path : null,
    params:props.routeParams
  }
}

// used to see if we need to run `initialize` again because
// of new routing props
export const compareRouteInfo = (a, b) => {
  return JSON.stringify(a) == JSON.stringify(b)
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