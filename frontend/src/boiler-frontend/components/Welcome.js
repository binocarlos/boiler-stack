import React, { Component, PropTypes } from 'react'
import Page from 'kettle-ui/lib/Page'

class Welcome extends Component {

  render() {

    return (
      <Page>
        <div>
          <p>
            Welcome!
          </p>
          {this.props.children}
        </div>
      </Page>
    )
  }

}

export default Welcome