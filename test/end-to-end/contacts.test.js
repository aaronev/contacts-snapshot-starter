const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
const app = require('../../src/server.js')
const db = require('../../src/db/contacts.js')

chai.use(chaiHttp)

const agent = chai.request.agent(app)

describe('Routes status 200', () => {
//*******************In server.js file comment out error handling page
  const itGets = [
    '/', 
    '/contacts/new', 
    '/contacts/1',
    '/contacts/search',
    '/contacts/:contactId/delete'
  ]
  const itPosts = [
    '/contacts'
  ]
  context('Get methods', () => { 
    itGets.map(route => {
      it(`app.get('${route}')`, done => {
        chai.request(app)
        .get(`${route}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          done()
        })
      })
    })
  })
  context('Post methods', () => {
    itPosts.map(route => {
      it(`app.post('${route}')`, done => {
        chai.request(app)
        .post(`${route}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
          done()
        })
      })
    })
  })
})

describe('Routes using db functions', () => {
  const newName = ['aaron', 'villanueva']
  var addedContact
  it(`app.get('/') should get all contacts from database`, done => {
    chai.request(app)
    .get('/')
    .end((err, res) => {
      db.getContacts()
      .then(contacts => {
        expect(contacts).to.be.an('array')
        expect(contacts[0].first_name).to.equal('Jared')
        done()
      })
    })
  })
  it(`app.get('/:contactId') should get a contact by it's id`, done => {
    chai.request(app)
    .get('/')
    .end((err, res) => {
      db.getContact(1)
      .then(contacts => {
        expect(contacts).to.be.an('object')
        expect(contacts.first_name).to.equal('Jared')
        done()
      })
    })
  })
  it(`app.post('/contacts') should add a new contact`, done => {
    chai.request(app)
    .post('/contacts')
    .end((err, res) => {
      db.createContact({first_name: newName[0], last_name: newName[1]})
      .then(contact => {
        addedContact = contact
        expect(contact.first_name).to.equal(newName[0])
        expect(contact.last_name).to.equal(newName[1])
        done()
      })
    })
  })
  it(`app.get('/search) should find contact`, done => {
    chai.request(app)
    .get('/:contactId/delete')
    .end((err, res) => {
      db.searchForContact('Aaron')
      .then(contacts => {
        expect(contacts[0].first_name).to.equal(newName[0])
        expect(contacts[0].last_name).to.equal(newName[1])
        done()
      })
    })
  })
  it(`app.get('/:contactId/delete') should delete contact by Id`, done => {
    chai.request(app)
    .get('/:contactId/delete')
    .end((err, res) => {
      db.deleteContact(addedContact.id)
      .then(contact => {
        expect(contact.first_name).to.equal(newName[0])
        expect(contact.last_name).to.equal(newName[1])
        done()
      })
    })
  })
})