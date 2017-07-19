const  DB = require('./db')
const contacts = new DB('contacts', ['first_name', 'last_name'])

const createContact = (contact, callback) =>
  contacts.add([
    contact.first_name,
    contact.last_name,
  ])
  .then(data => data[0])
  .catch(error => error)

const getContacts = () =>
  contacts.all()
    .then(data => data)
    .catch(error => error)

const getContact = (contactId) => 
  contacts.getByColumn('id', contactId)
    .then(data => data[0])
    .catch(error => error)

const deleteContact = (contactId) => 
  contacts.deleteRows('id', contactId)
    .then(data => data[0])
    .catch(error => error)

const searchForContact = (searchQuery) => 
  contacts.search(searchQuery)
    .then(data => data)
    .catch(error => error)

const getContactByFirstLastName = (values) =>
  contacts.getByTwoColumns('first_name', 'last_name', values)
    .then(data => data)
    .catch(error => error)

module.exports = {
  createContact,
  getContacts,
  getContact,
  deleteContact,
  searchForContact,
  getContactByFirstLastName,
}
