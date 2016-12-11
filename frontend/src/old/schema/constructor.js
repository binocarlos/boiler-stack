/*

  choose which of the types can be added to a parent
  
*/
const getNewItem = (opts = {}) => (parent, descriptor) => {
  return descriptor.initialData
}

export default getNewItem