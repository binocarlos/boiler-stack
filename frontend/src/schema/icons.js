import React, { Component, PropTypes } from 'react'

import FolderIcon from 'material-ui/svg-icons/file/folder'
import FileIcon from 'material-ui/svg-icons/editor/insert-drive-file'
import DiskIcon from 'material-ui/svg-icons/device/storage'

const ICONS = {
  folder:<FolderIcon />,
  file:<FileIcon />,
  disk:<DiskIcon />
}

const factory = (opts = {}) => {
  return ICONS
}

export default factory