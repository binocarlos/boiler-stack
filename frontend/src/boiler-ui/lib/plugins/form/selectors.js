export const FormSelectors = (raw) => {
  return {
    fields: (state) => raw(state).fields
  }
}

export default FormSelectors