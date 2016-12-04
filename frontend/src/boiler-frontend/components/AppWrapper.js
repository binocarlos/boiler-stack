import React, { Component, PropTypes } from 'react'
import UIAppWrapper from 'kettle-ui/lib/AppWrapper'

export class AppWrapper extends Component {

  render() {
    const settings = this.props.route.settings
    const AppBarComponent = settings.appbar

    const app = ( 
      <UIAppWrapper
        appbar={
          <AppBarComponent settings={settings} />
        }>
        <div>
          {this.props.children}
        </div>
      </UIAppWrapper>
    )

    const loading = (
      <div>loading...</div>
    )

    return this.props.isReady ? app : loading
  }
}

export default AppWrapper