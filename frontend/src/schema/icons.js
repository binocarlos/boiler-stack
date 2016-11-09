import React, { Component, PropTypes } from 'react'

import FolderIcon from 'material-ui/svg-icons/file/folder'
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file'
import DiskIcon from 'material-ui/svg-icons/device/storage'

import tools from './tools'
import getColor from './colors'

const ICONS = {
  folder:FolderIcon,
  item:FileIcon,
  disk:DiskIcon
}

const factory = (opts = {}) => {
  return (name, type, theme) => {
    const IconClass = ICONS[name] || ICONS.folder
    const color = (theme && type) ? getColor(theme, type) : null
    return (
      <IconClass color={color} />
    )
  }
}

const getIcon = (opts) => {

  const icons = factory(opts)

  return (item, type, theme) =>  {
    const iconType = tools.isIdTopLevel(opts.databases, item.id) ?
        'disk' :
        tools.getItemType(item) || 'folder'
    return icons(iconType, type, theme)
  }
}

export default getIcon