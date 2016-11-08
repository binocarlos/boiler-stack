/*

  choose which of the types can be added to a parent
  
*/
const getDescriptors = (opts = {}) => (parent, descriptors = []) => {
  return descriptors.filter(descriptor => descriptor.id != 'user')
}

export default getDescriptors