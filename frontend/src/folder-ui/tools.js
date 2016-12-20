import React, { Component, PropTypes } from 'react'
import deepCheck from 'deep-check-error'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'

import SectionWrapperComponent from './components/SectionWrapper'

export const getRouteInfo = (props) => {
  return {
    path:props.route ? props.route.path : null,
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

export const RouteLoader = ({ compare, loader, props }) => {
  class RouteLoaderWrapper extends Component {
    load() {
      loader(getRouteInfo(this.props), this.props.route)
    }
    componentDidMount() {
      this.load()
    }
    componentWillReceiveProps(nextProps) {
      if(compare(getRouteInfo(nextProps), getRouteInfo(this.props))) this.load()
    }
    render() {
      const finalProps = Object.assign({}, this.props, props)
      return <SectionWrapperComponent {...finalProps} />
    }
  }
  return withRouter(RouteLoaderWrapper)
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
  class ContainerClassWrapper extends Component {
    componentDidMount() {
      if(opts.initialize) opts.initialize(this.props, this.props.dispatch)
    }
    render() {
      const injectedProps = this.props.injectProps ?
        this.props.injectProps(this.props, this.props.dispatch) :
        {}
      const finalProps = Object.assign({}, this.props, injectedProps)
      return <ComponentClass {...finalProps} />
    }
  }
  return connect(
    opts.getState,
    (dispatch, ownProps) => {
      return {
        dispatch
      }
    }
  )(ContainerClassWrapper)
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