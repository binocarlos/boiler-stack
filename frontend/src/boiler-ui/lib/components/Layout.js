import React, { Component, PropTypes } from 'react'
import { Layout, Panel } from 'react-toolbox/lib/layout'
import Page from './Page'
import SideDrawer from './SideDrawer'
import PanelBar from './PanelBar'

class LayoutComponent extends Component {

  render() {

    const sideDrawerClass = this.props.sideDrawerClass
    const sideDrawerContent = this.props.sideDrawerContent// || sideDrawerClass ? <sideDrawerClass /> : null

    const panelBarClass = this.props.panelBarClass
    const panelBarContent = this.props.panelBarContent

    const sideDrawer = sideDrawerClass ?
      (
        <sideDrawerClass />
      ) :
      (
        sideDrawerContent ?
        (
          <SideDrawer>
            <div>
              {sideDrawerContent}
            </div>
          </SideDrawer>
        ) :
        null
      )

    const panelBar = panelBarClass ?
      (
        <panelBarClass />
      ) :
      (
        panelBarContent ?
        (
          <PanelBar flat>
            {panelBarContent}
          </PanelBar>
        ) :
        null
      )

    return (
      <Layout>
        {sideDrawer}
        <Panel>
            {panelBar}
            <Page>
              {this.props.children}
            </Page>
        </Panel>
      </Layout>
    )
  }

}

export default LayoutComponent