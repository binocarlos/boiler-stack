import {
  getPassportStatus
} from 'boiler-frontend/lib/actions'

export const refreshUserStatus = () => {
  return getPassportStatus()
}