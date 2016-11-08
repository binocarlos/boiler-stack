/*

  the table fields for the children view
  
*/
const NAME_FIELD = {
  title:'name',
  render:data => data.name
}

const TABLE_FIELDS = [
  NAME_FIELD
]

const factory = (opts = {}) => {
  return TABLE_FIELDS
}

export default factory