/* eslint-disable no-unused-vars */

// Require all models
var db = require('../models')
var axios = require('axios')
var cheerio = require('cheerio')

module.exports = function(app) {
	// Load index page
	app.get('/', function(req, res) {
		res.render('index')
    
	})

	// Load example page and pass in an example by id
	app.get('/example/:id', function(req, res) {
		res.render('index')
	})

	// Render 404 page for any unmatched routes
	app.get('*', function(req, res) {
		res.render('404')
	})
}
