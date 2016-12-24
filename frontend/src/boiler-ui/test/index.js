import minimist from 'minimist'
import runner from './runner'

const args = minimist(process.argv, {
  alias:{
    f:'filter'
  },
  default:{
    
  }
})

runner(args)