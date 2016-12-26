import deepCheck from 'deep-check-error'

const crud = (opts = {}) => {
  deepCheck(opts, [
    'selected',
    'actions.add',
    'actions.edit',
    'actions.delete'
  ])
  const selected = opts.selected
  let items = []
  if(selected.length<=0){
    items.push({
      title: 'Add',
      handler: opts.actions.add
    })
  }
  else if(selected.length==1){
    items.push({
      title: 'Edit',
      handler: opts.actions.edit
    })
  }
  if(selected.length>0 && deleteAction){
    items.push({
      title: 'Delete',
      handler: opts.actions.delete
    })
  }
  return items
}

export default crud