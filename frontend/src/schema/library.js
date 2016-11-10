import Chip from '../fields/Chip'

/*

  GUI components for the schema
  
*/
const LIBRARY = {
  chip:Chip
}

const factory = (opts = {}) => (context, item) => {
  return LIBRARY
}

export default factory