export const tableItems = (data = []) => {
  let db = {}
  let ids = data.map(item => item.id)
  data.forEach(item => db[item.id] = item)
  return {
    db:db,
    ids:ids
  }
}