const express = require('express')
const bodyParser = require('body-parser')
const dbContacts = require('./db/contacts')
const app = express()
const {renderError} = require('./server/utils')
const routes = require('./server/routes/index');

app.set('view engine', 'ejs');
app.set('views', './src/views')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use((request, response, next) => {
  response.locals.query = ''
  next()
})

app.use('/', routes)

// app.use((request, response) => {
//   response.render('not_found')
// })

const port = process.env.PORT || 3000

if(!module.parent) { // HOW?: {SOLVES: Uncaught Error: listen EADDRINUSE :::3000}
  app.listen(port, 
    console.log(`http://localhost:${port}`))
}

module.exports = app
