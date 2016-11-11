import Chip from './Chip'
import ProjectStatus from './ProjectStatus'
import NumberField from './NumberField'
import ClientId from './ClientId'
import DiggerList from './DiggerList'
import UnitField from './UnitField'

/*

  GUI components for the schema
  
*/
const LIBRARY = {
  chip:Chip,
  projectstatus:ProjectStatus,
  number:NumberField,
  clientid:ClientId,
  diggerlist:DiggerList,
  unit:UnitField
}

const factory = (opts = {}) => (context, item) => {
  return LIBRARY
}

export default factory