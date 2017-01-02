export const TableSelectors = (raw) => {
  const selectors = {
    data: (state) => raw(state).data,
    selection: (state) => raw(state).selection.value,
    items: (state) => {
      const data = selectors.data(state)
      return data.ids.map(id => data.db[id])
    },
    selectedItems: (state) => {
      const data = selectors.data(state)
      const selectedIds = selectors.selection(state)
      return selectedIds.map(id => data.db[id])
    }
  }
  return selectors
}

export default TableSelectors