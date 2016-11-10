import React, { Component, PropTypes } from 'react'

import IconButton from 'material-ui/IconButton'
import FlatButton from 'material-ui/FlatButton'
import IconMenu from 'material-ui/IconMenu'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'
import ButtonDropdown from 'kettle-ui/lib/ButtonDropdown'

const STYLES = {
  button:{
    backgroundColor: 'transparent',
    color: 'white'
  },
  leftContainer:{
    float:'left'
  },
  rightContainer:{
    float:'right'
  },
  padding:{
    paddingTop:'5px' 
  }
}

class AppBarChildren extends Component {

  getButtonTitle() {
    const currentProject = this.props.projects.filter(project => project.id == this.props.currentProject)[0]
    return currentProject ?
      currentProject.name :
      'Choose project'
  }

  getProjectMenuItems() {
    return this.props.projects.map((project, i) => {
      return (
        <MenuItem 
          key={i}
          value={project.littleid} 
          primaryText={project.name} />
      )
    })
  }

  getProjectButton() {
    return (
      <ButtonDropdown
        buttonclass={FlatButton}
        buttonprops={{
          label:this.getButtonTitle(),
          labelPosition:'before',
          style:STYLES.button,
          icon:<ExpandMoreIcon />
        }}>

        <Menu>
          {this.getProjectMenuItems()}
        </Menu>
        
      </ButtonDropdown>
    )
  }

  render() {

    return (
      <div>
        <div style={STYLES.leftContainer}>
          <div style={STYLES.padding}>
            {this.getProjectButton()}
          </div>
        </div>
        <div style={STYLES.rightContainer}>
          {this.props.children}  
        </div>
        
      </div>
    )
    
    
  }

}

export default AppBarChildren