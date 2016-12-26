import deepCheck from 'deep-check-error'

const selection = (opts = {}) => {
  deepCheck(opts, [
    'actions.selectAll',
    'actions.selectNone'
  ])
  return [{
    title: 'Select All',
    handler: opts.actions.selectAllAction
  },{
    title:'Select None',
    handler: opts.actions.selectNoneAction
  }]
}

export default selection