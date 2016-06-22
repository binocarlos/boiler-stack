import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Layout from '../components/Layout'

import LoginApp from '../../../shared/auth/containers/App'

export class App extends Component {
  render() {

    return (
      <LoginApp>
        <Layout urls={this.props.urls}>
          {this.props.children}
        </Layout>
      </LoginApp>
    )
    
  }
}

function mapStateToProps(state) {

  return {
    urls:state.urls
  }

}

export default connect(
  mapStateToProps
)(App)
