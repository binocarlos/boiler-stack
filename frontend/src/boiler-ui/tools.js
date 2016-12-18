import bows from 'bows'
import { open_snackbar } from 'boiler-frontend/src/actions'

export const userEventHandler = (section) => {
  const logger = bows(section + ':events')
  return (store, userEvent) => {
    logger('user event', userEvent)
    if(userEvent.snackbar) store.dispatch(open_snackbar(userEvent.message))
  }
}
