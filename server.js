require('dotenv').config()
var express = require('express')
var exphbs = require('express-handlebars')
var mongoose = require('mongoose')
var gradient = require('gradient-string')

var PORT = process.env.PORT || 3000
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadline'

mongoose.connect(MONGODB_URI)

// Middleware
var app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

// Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Routes
require('./routes/apiRoutes')(app)
require('./routes/htmlRoutes')(app)


app.listen(PORT, function() {
	console.log(gradient.vice(`\n==> 🌎  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`))
})

module.exports = app
