const pgp = require('pg-promise')()
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/contacts_development'
const db = pgp(connectionString)

numOfCol = (columns) => {
  let col = []
  for (let i = 1; i < columns.length+1; i++) {
    col.push('$'+ i)
  }
  return col.join()
}

const DBGenFunc = class DBGenFunc {
  constructor(table, addingColumns) {
    this.table = table
    this.columns = addingColumns
  }
  all() { 
    return db.any(`
      SELECT 
        * 
      FROM 
        ${this.table}`
    )
  }
  allByColumn(column, value) {
    return db.any(`
      SELECT 
        * 
      FROM 
        ${this.table} 
      WHERE 
        ${column} = $1`, value
    )
  }
  allByTwoColumns(col1, col2, values) {
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
        ${this.table} (${
          this.columns.join()
        })
      VALUES
        (${
          numOfCol(this.columns)
        })
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
  del(column, value) {
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
}

module.exports = DBGenFunc













