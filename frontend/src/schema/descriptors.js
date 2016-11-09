import tools from './tools'

/*

  get the base list
  
*/
const descriptorFilters = {
  standard:(parent, descriptors = []) => {
    return descriptors.filter(descriptor => descriptor.id != 'user')
  },
  users:(parent, descriptors = []) => {
    return descriptors.filter(descriptor => descriptor.id == 'user')
  },
  projects:(parent, descriptors = []) => {
    return descriptors.filter(descriptor => descriptor.id == 'project')
  }
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