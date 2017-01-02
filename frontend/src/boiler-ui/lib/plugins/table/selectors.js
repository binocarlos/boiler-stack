export const TableSelectors = (raw) => {
  const selectors = {
    data: (state) => raw(state).data,
    selection: (state) => raw(state).selection.value,
    items: (state) => {
      const db = selectors.data(state).db
      return selectors.data(state).ids.map(id => db[id])
    }
  }
  return selectors
}

export default TableSelectors