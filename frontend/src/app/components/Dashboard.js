import React, { Component, PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton'

import { TOP_LEVEL_BUTTONS } from '../../schema/icons'



class Dashboard extends Component {

  render() {

    return (
      <div>
      {
        TOP_LEVEL_BUTTONS.map((button, i) => {
          return (
            <div key={i} style={{margin:20}}>
              <RaisedButton 
                label={button.title}
                primary={true}
                onTouchTap={() => {
                  this.props.gotoPage(button.path)
                }}
                icon={button.icon}
                />
            </div>
          )
        })
      }
      </div>
    )
  }

}

export default Dashboard