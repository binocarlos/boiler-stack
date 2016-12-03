import React, { Component, PropTypes } from 'react'
import UIAppWrapper from 'kettle-ui/lib/AppWrapper'

export class AppWrapper extends Component {

  render() {
    const AppBarComponent = this.props.route.settings.appbar

    return ( 
      <UIAppWrapper
        appbar={
          <AppBarComponent settings={this.props.route.settings} />
        }>
        <div>
          {this.props.children}
        </div>
      </UIAppWrapper>
    )
  }
}

export default AppWrapper