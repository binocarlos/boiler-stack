import ToggleActions from '../folder-ui/lib/actions/toggle'

import {
  action
} from '../folder-ui/lib/actions/tools'

import { PUSH } from 'redux-little-router'

export const menu = ToggleActions('BOILER_MENU')
export const snackbar = ToggleActions('BOILER_SNACKBAR')
export const router = {
  types:{
    push: PUSH,
  },
  push: (payload) => action(PUSH, { payload })
}