import React, { Component, PropTypes } from 'react'

import FolderIcon from 'material-ui/svg-icons/file/folder'
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file'
import DiskIcon from 'material-ui/svg-icons/device/storage'
import People from 'material-ui/svg-icons/social/people'
import Person from 'material-ui/svg-icons/social/person'

import { decodeID } from 'folder-ui/lib/db/composite'

import tools from './tools'
import getColor from './colors'

/*

  the actual icon elements
  
*/
const ICONS = {
  folder:FolderIcon,
  item:FileIcon,
  disk:DiskIcon,
  people:People,
  user:Person
}

/*

  what icons to use for what top level database id
  
*/
const TOP_LEVEL_ICONS = {
  standard:'disk',
  users:'people'
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

const getTopLevelIcon = (item) => {
  const itemid = decodeID(item.id)
  return TOP_LEVEL_ICONS[itemid] || TOP_LEVEL_ICONS.standard
}

const getItemIcon = (item) => {
  return tools.getItemType(item) || 'folder'
}

const getIcon = (opts) => {

  const icons = factory(opts)

  return (item, type, theme) =>  {
    const iconType = tools.isIdTopLevel(opts.databases, item.id) ?
        getTopLevelIcon(item) :
        getItemIcon(item)
    return icons(iconType, type, theme)
  }
}

export default getIcon