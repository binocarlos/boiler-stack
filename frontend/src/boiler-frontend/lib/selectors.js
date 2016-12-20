export const menu = (state) => {
  return {
    open:() => state.boiler.menu.open
  }
}

export const snackbar = (state) => {
  return {
    open:() => state.boiler.snackbar.open,
    message:() => state.boiler.snackbar.message
  }
}