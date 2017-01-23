"use strict";
const tape = require('tape')
const tools = require('../../../testtools')
const Crud = require('../../../src/database/crud')

const getCrud = (postgres, done) => {
  const connection = tools.connection(postgres)
  connection((client, finish) => {
    const crud = Crud(client, 'fruit')
    done(crud)
  })
}

tape('crud - sanity', (t) => {
  const postgres = tools.postgres()
  getCrud(postgres, crud => {
    crud.select({
      color: 'red'
    }, (err, results) => {
      t.deepEqual(results, [], 'empty array')
      t.end()
    })  
  })
})

tape('crud - select', (t) => {
  const query = {
    sql: 'select * from fruit where color = $1',
    params: ['red']
  }
  const results = [{
    name: 'apples'
  }, {
    name: 'oranges'
  }]
  const postgres = tools.postgres()
  postgres.expect(query, results)

  getCrud(postgres, crud => {
    crud.select({
      color: 'red'
    }, (err, results) => {
      postgres.check(t, 'select query is correct')
      t.end()
    })
  })
})

tape('crud - get', (t) => {
  const query = {
    sql: 'select * from fruit where color = $1',
    params: ['red']
  }
  const results = [{
    name: 'apples'
  }, {
    name: 'oranges'
  }]
  const postgres = tools.postgres()
  postgres.expect(query, results)

  getCrud(postgres, crud => {
    crud.get({
      color: 'red'
    }, (err, results) => {
      t.equal(results.name, 'apples', 'one result that is object')
      t.end()
    })
  })
})

tape('crud - insert', (t) => {
  const query = {
    sql: 'insert into fruit ( name, color ) values ( $1, $2 ) returning *',
    params: ['apples', 'red']
  }
  const postgres = tools.postgres()
  postgres.expect(query)

  getCrud(postgres, crud => {
    crud.insert({
      name: 'apples',
      color: 'red'
    }, (err, results) => {
      postgres.check(t, 'insert query is correct')
      t.end()
    })
  })
})

tape('crud - update', (t) => {
  const query = {
    sql: 'update fruit set color = $1 where name = $2 returning *',
    params: ['green', 'apples']
  }
  const postgres = tools.postgres()
  postgres.expect(query)

  getCrud(postgres, crud => {
    crud.update({
      color: 'green'
    }, {
      name: 'apples'
    }, (err, results) => {
      postgres.check(t, 'update query is correct')
      t.end()
    })
  })
})

tape('crud - delete', (t) => {
  const query = {
    sql: 'delete from fruit where name = $1',
    params: ['apples']
  }
  const postgres = tools.postgres()
  postgres.expect(query)

  getCrud(postgres, crud => {
    crud.delete({
      name: 'apples'
    }, (err, results) => {
      postgres.check(t, 'delete query is correct')
      t.end()
    })
  })
})