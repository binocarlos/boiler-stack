import { getUserData } from './user'
export const currentInstallation = (state) => {
  const userData = getUserData(state)
  if(!userData) return null
  const data = userData.data || {}
  return data.currentInstallation
}