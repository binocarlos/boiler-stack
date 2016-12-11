import tools from './tools'


const SYSTEM_TYPES = {
  user:true,
  project:true,
  client:true,
  quote:true
}

const descriptorFilter = (types = SYSTEM_TYPES, include = false) => (parent, descriptors = []) => {
  return descriptors.filter(descriptor => types[descriptor.id] ? include : !include)
}
/*

  get the base list
  
*/
const descriptorFilters = {
  standard:descriptorFilter(),
  users:descriptorFilter({
    user:true
  }, true),
  projects:descriptorFilter({
    project:true
  }, true),
  clients:descriptorFilter({
    client:true
  }, true),
  quotes:descriptorFilter({
    quote:true
  }, true)
}
/*

  choose which of the types can be added to a parent
  
*/
const getDescriptors = (opts = {}) => (parent, descriptors = []) => {
  const databaseid = tools.getItemDatabaseId(parent.id)
  const descriptorfn = descriptorFilters[databaseid] || descriptorFilters.standard
  return descriptorfn(parent, descriptors)
}

export default getDescriptors