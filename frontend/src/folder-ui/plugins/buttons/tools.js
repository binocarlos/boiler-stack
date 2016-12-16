export const CombineButtons = (opts = {}) => {
  const type = opts.type || 'dropdown'
  const items = opts.items || []
  return (state, store, routeInfo, actions) => {
    const allButtons = items.reduce((buttons, factory) => {
      return buttons.concat(factory(state, store, routeInfo, actions))
    }, [])
    if(type == 'dropdown'){
      return allButtons.length > 0 ?
        [{
          type:'dropdown',
          title:opts.title || 'Actions',
          items:allButtons
        }] : []
    }
    else{
      return allButtons.map(item => {
        return Object.assign({}, item, {
          type:'button'
        })
      })
    }
  }
}