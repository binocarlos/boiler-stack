import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchLibrary } from '../actions/library'
import Loading from '../components/Loading'
import LibraryComponent from '../components/Library'


class Library extends Component {
  render() {

    var props = this.props
    if(!props.loaded){
      return <Loading />
    }

    if(props.error){
      return (
        <div>error: {props.error}</div>
      )
    }

    return (
      <LibraryComponent {...props} />
    )
  }

  componentWillMount() {
    this.props.loadLibrary(this.props.url)
  }
}

function mapStateToProps(state) {

  var data = Object.keys(state.library.data || {}).map(function(key){
    return state.library.data[key]
  })

  return {
    url:state.urls.library,
    loaded:state.library.loaded,
    loading:state.library.loading,
    error:state.library.error,
    data:data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadLibrary:function(url){
      dispatch(fetchLibrary(url))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Library)
