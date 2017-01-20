"use strict";

const UserCreate = (models) => (user) => {
  console.log('-------------------------------------------');
  console.log('-------------------------------------------');
  console.log('creating user')
  console.dir(user)
}

module.exports = UserCreate