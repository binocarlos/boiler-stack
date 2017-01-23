"use strict";
const tools = require('../tools')
const Crud = require('../database/crud')

const login = (email, password, done) => {
    crud.get({email}, (err, result) => {
      if(err) return done(err)
      if(!result) return done()
      done(null, tools.checkUserPassword(result, password) ? result : null)
    })
  }
  
const User = (connection, eventBus) => {

  const crud = Crud(connection, 'useraccount')
  
  

  const register = (data, done) => {
    const userData = tools.generateUser(data)
    crud.insert(userData, (err, result) => {
      if(err) return done(err)
      eventBus.emit('models.user.register', {
        query: {
          data
        },
        result
      })
      done(null, result)
    })
  }

  const save = (data, params, done) => {
    const userData = {data: JSON.stringify(data)}
    crud.update(userData, params, (err, result) => {
      if(err) return done(err)
      eventBus.emit('models.user.save', {
        query: {
          data,
          params
        },
        result
      })
      done(null, result)
    })
  }

  return {
    login,
    register,
    save
  }
}

module.exports = User