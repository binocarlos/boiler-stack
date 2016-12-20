export const BOILER_TOGGLE_MENU = 'BOILER_TOGGLE_MENU'
export const toggle_menu = (open = true) => {
  return {
    type: BOILER_TOGGLE_MENU,
    open
  }
}

export const BOILER_OPEN_SNACKBAR = 'BOILER_OPEN_SNACKBAR'
export const open_snackbar = (message = '') => {
  return {
    type: BOILER_OPEN_SNACKBAR,
    message
  }
}

export const BOILER_CLOSE_SNACKBAR = 'BOILER_CLOSE_SNACKBAR'
export const close_snackbar = () => {
  return {
    type: BOILER_CLOSE_SNACKBAR
  }
}
