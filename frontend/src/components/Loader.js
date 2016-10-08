import React, { PropTypes, Component } from 'react'
import CircularProgress from 'material-ui/CircularProgress'

class Loader extends Component {

  render() {

    return (
       <div>
        <CircularProgress />
      </div>
    )
  }
}

export default Loader