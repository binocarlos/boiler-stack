import Chip from '../fields/Chip'
import ProjectStatus from '../fields/ProjectStatus'
import NumberField from '../fields/NumberField'
import ClientId from '../fields/ClientId'

/*

  GUI components for the schema
  
*/
const LIBRARY = {
  chip:Chip,
  projectstatus:ProjectStatus,
  number:NumberField,
  clientid:ClientId
}

const factory = (opts = {}) => (context, item) => {
  return LIBRARY
}

export default factory