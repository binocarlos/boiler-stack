import {
  action,
  getTypes
} from './tools'

const TOGGLE = 'TOGGLE'
const CONFIRM = 'CONFIRM'
const confirmDialogTypes = [TOGGLE, CONFIRM]

const getConfirmDialogTypes = (base) => {
  return getTypes(base, confirmDialogTypes)
}

const ConfirmDialogActions = (base) => {
  const types = getConfirmDialogTypes(base)
  return {
    types,
    open: () => action(types.TOGGLE, {open:true}),
    close: () => action(types.TOGGLE, {open:false}),
    confirm: (data) => action(types.CONFIRM, {data}),
    toggle: (open = false) => action(types.TOGGLE, {open})
  }
}

export default ConfirmDialogActions