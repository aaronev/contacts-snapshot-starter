const { expect } = require('chai')
const DB = require('../../../src/db/db')

describe('DB Generic Functions', () => {
  const Test = new DB('test', ["first_name", "last_name"])
  console.log('*****Function numOfValToAdd generates::', Test.numOfValToAdd())
  it('Creates rows', () => 
    Test.add(['aaron', 'villanueva']) 
    .then( newUser => {
      expect(newUser[0].first_name).to.equal('aaron')
      expect(newUser[0].last_name).to.equal('villanueva')
    })
  ),
  it('Updates rows', () => 
    Test.edit('first_name', ['billy', 'aaron'])
    .then( updated => {
      expect(updated[0].first_name).to.equal('billy')
      expect(updated[0].last_name).to.equal('villanueva')
    })
  ),
  it('Reads all rows from a table', () =>     
    Test.all().then( rows => {
      expect(rows).to.be.an('array')
      expect(rows.length).to.equal(1)
    })
  ),
  it('Reads all rows by a column and it\'s value', () => 
      Test.getByColumn('first_name', 'billy')
      .then( rows => { 
        expect(rows[0].last_name).to.equal('villanueva')
      })
    ),
  it('Reads all rows by meeting the values of two columns', () =>    
    Test.getByTwoColumns(
      'first_name', 'last_name', ['billy', 'villanueva']
    ).then( rows => { 
      expect(rows[0]).to.deep.equal({
        id: 1, first_name:'billy', last_name:'villanueva'
      })
    })
  ),
  it('Deletes rows by column and value', () => 
    Test.deleteRows('id', 1).then(deleted => {
      expect(deleted[0].first_name).to.equal('billy')
      expect(deleted[0].last_name).to.equal('villanueva')
    })
  )
  Test.deleteAllRows()
})