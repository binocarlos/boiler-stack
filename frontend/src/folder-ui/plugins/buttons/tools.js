export const CombineButtons = (opts = {}, factories = []) => {
  const type = opts.type || 'dropdown'
  return (state, store, routeInfo, actions) => {
    const allButtons = factories.reduce((buttons, factory) => {
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