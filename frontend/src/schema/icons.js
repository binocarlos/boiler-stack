import React, { Component, PropTypes } from 'react'

import FolderIcon from 'material-ui/svg-icons/file/folder'
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file'
import DiskIcon from 'material-ui/svg-icons/navigation/apps'
import MediaFolder from 'material-ui/svg-icons/action/perm-media'
import People from 'material-ui/svg-icons/social/people'
import Person from 'material-ui/svg-icons/social/person'
import Quote from 'material-ui/svg-icons/action/assignment'
import Template from 'material-ui/svg-icons/action/donut-small'
import Dashboard from 'material-ui/svg-icons/action/dashboard'
import Team from 'material-ui/svg-icons/action/group-work'
import Labour from 'material-ui/svg-icons/maps/transfer-within-a-station'
import Material from 'material-ui/svg-icons/editor/format-paint'
import Hire from 'material-ui/svg-icons/maps/local-shipping'
import About from 'material-ui/svg-icons/action/info-outline'

import Project from 'material-ui/svg-icons/file/cloud'

import { decodeID } from 'folder-ui/lib/db/composite'

import getColor from './colors'

import {
  getItemType,
  isIdTopLevel
} from '../tools'

/*

  the actual icon elements
  
*/
export const ICONS = {
  folder:FolderIcon,
  item:FileIcon,
  disk:DiskIcon,
  project:Project,
  resources:MediaFolder,
  people:People,
  user:Person,
  client:Person,
  quote:Quote,
  template:Template,
  team:Team,
  dashboard:Dashboard,
  about:About,
  labour:Labour,
  material:Material,
  hire:Hire
}

/*

  what icons to use for what top level database id
  
*/
export const TOP_LEVEL_ICONS = {
  standard:'disk',
  users:'people',
  clients:'people',
  quotes:'quote',
  projects:'project',
  coreresources:'resources',
  userresources:'resources',
  coretemplates:'template',
  usertemplates:'template',
  coreteams:'team',
  userteams:'team',
  teams:'team',
  templates:'template',
  resources:'resources',
  dashboard:'dashboard',
  about:'about'
}

export const TOP_LEVEL_BUTTONS = [{
  path:'/projects',
  title:'Projects',
  icon:<Project />
},{
  path:'/clients',
  title:'Clients',
  icon:<People />
},{
  path:'/resources',
  title:'Resources',
  icon:<MediaFolder />
},{
  path:'/templates',
  title:'Templates',
  icon:<Template />
},{
  path:'/team',
  title:'Teams',
  icon:<Team />
},{
  path:'/quotes',
  title:'Quotes',
  icon:<Quote />
}]

export const iconFactory = (name) => {
  name = TOP_LEVEL_ICONS[name] || name
  return ICONS[name]
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

export const getItemIcon = (item, getElement = false) => {
  const iconName = getItemType(item) || 'folder'
  return getElement ?
    ICONS[iconName] :
    iconName
}

const getIcon = (opts) => {

  const icons = factory(opts)

  return (item, type, theme) =>  {
    const iconType = isIdTopLevel(opts.databases, item.id) ?
        getTopLevelIcon(item) :
        getItemIcon(item)
    return icons(iconType, type, theme)
  }
}

export default getIcon