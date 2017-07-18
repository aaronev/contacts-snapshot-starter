const chai = require('chai')
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const { expect } = chai

const dbHelper = require('../helpers/db')

describe('Data Base functions', () => {
  
  beforeEach('reset the DB', (done) => {
    dbHelper.resetDB().then(() => {
      
    })
  })

  it('creates information', () => {
  	somePromise.then()
  })
  
  it('reads informaton', () => {

  })
  
  it('updates information', () => {

  })
  
  it('deletes information', () => {

  })
}}

