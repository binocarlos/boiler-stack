import deepCheck from 'deep-check-error'

const form = (opts = {}) => {
  deepCheck(opts, [
    'actions'
  ])

  let buttons = []

  if(opts.actions.cancel){
    buttons.push({
      title: 'Cancel',
      handler: opts.actions.cancel
    })
  }

  if(opts.actions.revert){
    buttons.push({
      title: 'Revert',
      handler: opts.actions.revert
    })
  }

  if(opts.actions.save){
    buttons.push({
      title: 'Save',
      handler: opts.actions.save,
      extraProps:{
        primary:true,
        disabled:opts.saveDisabled
      }
    })
  }

  return buttons
}

export default form