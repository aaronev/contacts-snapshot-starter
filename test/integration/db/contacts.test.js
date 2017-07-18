const { expect } = require('chai')
const { initDB } = require('../../helpers/db')
const { get, del, edit, add } = require('../../../src/db/db')

const table = 'test' 
const insertColumns = ["first_name", "last_name"]
const getCol1 = 'first_name'
const getCol2 = 'last_name'

describe('DB Generic Functions', () => {
  var newInfo;
  it('Creates information', () => 
    add(table, insertColumns, ['aaron', 'villanueva']) 
    .then(newUser => {
      newInfo = newUser[0]
      expect(newUser[0].first_name).to.equal('aaron')
      expect(newUser[0].last_name).to.equal('villanueva')
    })
  ),
  it('Updates information', () => 
    edit(table, 'first_name', 'Billy', newInfo.first_name)
    .then(updated => {
      expect(updated[0].first_name).to.equal('Billy')
      expect(updated[0].last_name).to.equal('villanueva')
    })
  ),
  context('Reads all information:', () => {
   it('From a table', () =>     
      get.all(table).then( rows => {
        expect(rows).to.be.an('array')
        expect(rows[rows.length-1].first_name).to.equal('Billy')
      })
    ),
   it('By a column and it\'s value', () => 
      get.allByColumn(table, 'first_name', 'Jared')
      .then( rows => { 
        expect(rows[0].last_name).to.equal('Grippe')
      })
    ),
   it('By meeting the values of two columns', () =>    
      get.allByTwoColumns(
        table, getCol1, getCol2, ['Jared', 'Grippe']
      ).then( rows => { expect(rows[0].id).to.equal(1) })
    )
  }),
  it('Deletes information', () => 
    del(table, 'id', newInfo.id)
    .then(deleted => {
      expect(deleted[0].first_name).to.equal('Billy')
      expect(deleted[0].last_name).to.equal('villanueva')
    })
  )
})