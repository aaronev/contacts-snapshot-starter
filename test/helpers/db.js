const pgp = require('pg-promise')()
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/contacts_development'
const db = pgp(connectionString)

const resetDB = () => {
  const tables = ['contacts']
  return Promise.all(tables.map((table) => {
    return db.none(`TRUNCATE ${table} RESTART IDENTITY`)
  }))
}

const seedDB = () => {
  return Promise.new((resolve, reject) => {
    resolve('successfully seeded the db')
  })
}

const initDB = () => {
  return resetDB().then(() => {
    return seedDB()
  })
}

module.exports = {initDB}

//look up postgres sql truncate