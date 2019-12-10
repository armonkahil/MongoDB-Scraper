/* eslint-disable no-unused-vars */


var axios = require('axios')
var cheerio = require('cheerio')
var db = require('../models')

module.exports = function(app) {
	// Get all examples
	app.get('/api/scrape', function(req, res) {
		axios.get('https://www.nytimes.com/section/world').then(function (response) {
		
			var $ = cheerio.load(response.data)
			var results = []
			$('a').each(function(i, element) {

				// Save the text of the element in a "title" variable
				var title = $(element).text()
		
				// In the currently selected element, look at its child elements (i.e., its a-tags),
				// then save the values for any "href" attributes that the child elements may have
				var link = $(element).children().attr('href')
		
				// Save these results in an object that we'll push into the results array we defined earlier
				results.push({
					title: title,
					link: link
				})
			})
		
			// Log the results once you've looped through each of the elements found with cheerio
			console.log(results)
		})
		res.render('index')
	})

	// Create a new example
	app.post('/api/examples', function(req, res) {
		res.render('index')
	})

	// Delete an example by id
	app.delete('/api/examples/:id', function(req, res) {
		res.render('index')
	})
}
