import React, { Component, PropTypes } from 'react'

import FolderIcon from 'material-ui/svg-icons/file/folder'
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file'
import DiskIcon from 'material-ui/svg-icons/device/storage'

import tools from './tools'
import COLORS from './colors'

// pick colors from the theme
const ICON_COLORS = {
  tree:'primary1Color'
}

const ICONS = {
  folder:FolderIcon,
  file:FileIcon,
  disk:DiskIcon
}

const factory = (opts = {}) => {
  return (name, color, theme) => {
    console.log('-------------------------------------------');
    console.log(name)
    console.log(color)
    console.dir(theme)
    const IconClass = ICONS[name] || ICONS.folder
    color = ICON_COLORS[color] || color
    if(theme && theme.palette[color]){
      color = theme.palette[color]
    }
    return (
      <IconClass color={color} />
    )
  }
}

const getIcon = (opts) => {

  const icons = factory(opts)

  return (item, color, theme) =>  {
    const iconType = tools.isIdTopLevel(opts.databases, item.id) ?
        'disk' :
        tools.getItemType(item) || 'folder'
    return icons(iconType, color, theme)
  }
}

export default getIcon