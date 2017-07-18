const { expect } = require('chai')
const { initDB } = require('../../helpers/db')
const DBGenFunc = require('../../../src/db/db')

describe('DB Generic Functions', () => {
  var Test = new DBGenFunc('test', ["first_name", "last_name"])
  var newInfo;
  it('Creates information', () => 
    Test.add(['aaron', 'villanueva']) 
    .then(newUser => {
      newInfo = newUser[0]
      expect(newUser[0].first_name).to.equal('aaron')
      expect(newUser[0].last_name).to.equal('villanueva')
    })
  ),
  it('Updates information', () => 
    Test.edit('first_name', ['billy', newInfo.first_name])
    .then(updated => {
      expect(updated[0].first_name).to.equal('billy')
      expect(updated[0].last_name).to.equal('villanueva')
    })
  ),
  it('Reads all information from a table', () =>     
    Test.all().then( rows => {
      expect(rows).to.be.an('array')
      expect(rows.length).to.equal(1)
    })
  ),
  it('Reads all information by a column and it\'s value', () => 
      Test.allByColumn('first_name', 'billy')
      .then( rows => { 
        expect(rows[0].last_name).to.equal('villanueva')
      })
    ),
  it('Reads all information by meeting the values of two columns', () =>    
    Test.allByTwoColumns(
      'first_name', 'last_name', ['billy', 'villanueva']
    ).then( rows => { 
      expect(rows[0]).to.deep.equal({
        id: 1, first_name:'billy', last_name:'villanueva'
      })
    })
  ),
  it('Deletes rows by column and value', () => 
    Test.del('id', newInfo.id).then(deleted => {
      expect(deleted[0].first_name).to.equal('billy')
      expect(deleted[0].last_name).to.equal('villanueva')
    })
  )
  Test.deleteAllRows()
})