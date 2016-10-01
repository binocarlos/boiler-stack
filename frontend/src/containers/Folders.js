import React, { Component, PropTypes } from 'react'
import { withRouter } from 'react-router'
import FolderContainer from 'folder-ui/lib/FolderContainer'

import DB from '../db'
import { get_schema } from '../schema'

let db = DB()

class Folders extends Component {

  updateRoute(url) {
    this.props.router.push(url)
  }

  render() {

    return (
      <FolderContainer
        db={db}
        width={250}
        context={{
          // this is arbritrary data passed to the database functions
          mainapp:true
        }}
        splat={this.props.params.splat}
        path={this.props.route.path}
        updateRoute={this.updateRoute.bind(this)}
        getSchema={get_schema} />
    )
  }

}

export default withRouter(Folders)