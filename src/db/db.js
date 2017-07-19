const pgp = require('pg-promise')()
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/contacts_development'
const db = pgp(connectionString)

const DBGenFunc = class DBGenFunc {

  constructor(table, columnsForAdding) {
    this.table = table
    this.columns = columnsForAdding
  }

  numOfValToAdd() {
    let col = []
    for (let i = 1; i <= this.columns.length; i++) {
      col.push('$'+ i)
    }
    return col.join()
  }

  all() { 
    return db.any(`
      SELECT 
        * 
      FROM 
        ${this.table}`
    )
  }

  getByColumn(column, value) {
    return db.any(`
      SELECT 
        * 
      FROM 
        ${this.table} 
      WHERE 
        ${column} = $1`, value
    )
  }

  getByTwoColumns(col1, col2, values) {
    return db.any(`
      SELECT 
        *
      FROM
        ${this.table}
      WHERE 
        ${col1} = $1
      AND
        ${col2} = $2`, values
    )
  }

  add(values) {
    return db.any(`
      INSERT INTO
        ${this.table} 
        (${this.columns.join()})
      VALUES
        (${this.numOfValToAdd()})
      RETURNING 
        *`, values
    )
  }

  edit(column, values) {
    return db.any(`
      UPDATE 
        ${this.table}
      SET
        ${column} = $1
      WHERE
        ${column} = $2
      RETURNING
        *`, values
    )
  }

  deleteRows(column, value) {
    return db.any(`
      DELETE FROM 
        ${this.table}
      WHERE 
        ${column} = $1
      RETURNING
        *`, value
      )
    }

  deleteAllRows() {
    return db.none(`
      TRUNCATE TABLE 
        ${this.table}
      RESTART IDENTITY`
    )
  }

  search(searchQuery) {
    return db.any(`
      SELECT
        *
      FROM
        contacts
      WHERE
        lower(first_name || ' ' || last_name) LIKE $1::text
      `, [`%${searchQuery.toLowerCase().replace(/\s+/,'%')}%`]
    )
  }
}

module.exports = DBGenFunc