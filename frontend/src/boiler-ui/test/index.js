import minimist from 'minimist'
import runner from './runner'

const args = minimist(process.argv, {
  alias:{
    d:'dir',
    b:'base'
  },
  default:{
    
  }
})

runner(args)