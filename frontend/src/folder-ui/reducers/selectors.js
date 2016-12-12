export const virtualTable = (state) => {
  const raw = state.get.data
  const selected = state.tools.selected
  return {
    raw,
    selected,
    getItems:() => raw.ids.map(id => raw.db[id]),
    getSelectedItems:() => selected.map(id => raw.db[id])
  }
}