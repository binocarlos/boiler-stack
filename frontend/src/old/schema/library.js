import Chip from '../fields/Chip'
import ProjectStatus from '../fields/ProjectStatus'

/*

  GUI components for the schema
  
*/
const LIBRARY = {
  chip:Chip,
  projectstatus:ProjectStatus
}

const factory = (opts = {}) => (context, item) => {
  return LIBRARY
}

export default factory