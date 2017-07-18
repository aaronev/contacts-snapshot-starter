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

var get = {
  all: (table) => 
    db.any(`
      SELECT 
        * 
      FROM 
        ${table}
    `),

  allByColumn: (table, column, value) => 
    db.any(`
      SELECT 
        * 
      FROM 
        ${table} 
      WHERE 
        ${column} = $1`, value
    ),

  allByTwoColumns: (table, col1, col2, values) => 
    db.any(`
      SELECT 
        *
      FROM
        ${table}
      WHERE 
        ${col1} = $1
      AND
        ${col2} = $2`, values
    )
}

add = (table, columns, values) => 
  db.any(`
    INSERT INTO
      ${table} (${columns.join()})
    VALUES
      (${numOfCol(columns)})
    RETURNING 
      *`, values
  )

edit = (table, column, newVal, oldVal) =>
  db.any(`
    UPDATE 
      ${table}
    SET
      ${column} = $1
    WHERE
      ${column} = $2
    RETURNING
      *`, [newVal, oldVal]
    )

del = (table, column, value) =>
  db.any(`
    DELETE FROM 
      ${table}
    WHERE 
      ${column} = $1
    RETURNING
      * `, value
    )

module.exports = { db, get, add, edit, del }