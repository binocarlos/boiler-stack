import {
  cyan500
} from 'material-ui/styles/colors'
import { darken } from 'material-ui/utils/colorManipulator'

export const APP_COLORS = {
  //tree:'lighticon',
  table:'lighticon'
}

export const THEME_COLORS = {
  lighticon:'primary1Color'
}

const getColor = (theme, name) => {
  if(!theme || !name) return
  let color = name

  if(APP_COLORS[color]){
    color = THEME_COLORS[APP_COLORS[color]]
  }
  else if(THEME_COLORS[color]){
    color = THEME_COLORS[color] 
  }

  if(theme.palette[color]) return theme.palette[color]
  if(typeof(color) == 'function') return color(theme.palette, name)
  return null
}

export default getColor