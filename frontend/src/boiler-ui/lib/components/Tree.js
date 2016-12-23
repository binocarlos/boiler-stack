import React, { PropTypes, Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Folder from 'material-ui/svg-icons/file/folder'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { mergeStyles } from '../../../kettle-ui/lib/tools'

const DEFAULT_STYLES = {
  selected:{
    backgroundColor:'rgb(232, 232, 232)'
  },
  header:{
    marginTop:'4px',
    marginBottom:'4px'
  }
}

const getStyles = (overrides = {}) => {
  return mergeStyles(DEFAULT_STYLES, overrides)
}

class Tree extends Component {
  
  getIcon(data) {
    return this.props.getIcon ? 
      this.props.getIcon(data, this.props.muiTheme) :
      <Folder />
  }

  getStyles() {
    return getStyles(this.props.styles)
  }

  getItemStyle(data) {
    const styles = this.getStyles()
    return data.id==this.props.selected ? 
      styles.selected : 
      null
  }

  getTreeNode(id, i = 0) {

    const data = this.props.data[id]
    const children = this.props.children[id] || []
    const name = data.name || 'no title'
    const isOpen = this.props.open[id] ? true : false

    return (
      <ListItem 
        key={i}
        primaryText={data.name || 'no title'} 
        primaryTogglesNestedList={false} 
        leftIcon={this.getIcon(data)} 
        style={this.getItemStyle(data)}
        onTouchTap={() => {
          this.props.selectItem(data)
        }}
        onNestedListToggle={() => {
          this.props.toggleItem(data.id, !isOpen)
        }}
        open={isOpen}
        initiallyOpen={isOpen}
        nestedItems={children.map(this.getTreeNode.bind(this))} />
    )
  }

  render() {
   
    const styles = this.getStyles()
    const data = this.props.data || []

    return (
      <List>
        {this.props.title ? 
          (
            <Subheader style={styles.header}>
              {this.props.title}
            </Subheader>
          )
          : 
          null
        }
        {rootids.map(this.getTreeNode.bind(this))}
      </List>
    )    
  }

}

export default muiThemeable()(Tree)