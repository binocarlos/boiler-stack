export const getTableRaw = (state) => state.get.data
export const getTableIds = (state) => getTableRaw(state).ids || []
export const getTableSelectedIds = (state) => getTableRaw(state).ids || []
export const getTableDb = (state) => getTableRaw(state).db || {}
export const getTableData = (state) => getTableIds(state).map(id => getTableDb(state)[id])
export const getSelectedTableItems = (state) => getTableSelectedIds(state).map(id => getTableDb(state)[id])