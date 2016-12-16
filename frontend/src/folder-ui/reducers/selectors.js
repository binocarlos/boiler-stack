export const virtualTable = (ids = [], db = {}) => {
  return {
    getItems:() => ids.map(id => db[id]),
    getSelectedItems:(selected = []) => selected.map(id => db[id])
  }
}