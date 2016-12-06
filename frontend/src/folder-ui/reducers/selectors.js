const baseSelector = (getBaseState) => {
  return {
    tree:(state) => getBaseState(state).tree
  }
}

export default baseSelector
export const statusData = (state) => state.passport.statusApi