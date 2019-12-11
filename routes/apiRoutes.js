/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
const gradient = require('gradient-string')
const axios = require('axios')
const cheerio = require('cheerio')
const db = require('../models')

module.exports = (app) => {
  // Get all examples
  app.get('/api/scrape', (req, res) => {
    axios.get('https://nytimes.com/').then((response) => {
      const $ = cheerio.load(response.data)
      const results = []
      $('div.assetWrapper').each((i, element) => {
        const title = $(element).find('h2').text()
        // Save the text of the element in a "title" variable
        const link = 'https://www.nytimes.com' + $(element).find('a').attr('href')

        results.push({ title, link })
      })
      // Log the results once you've looped through each of the elements found with cheerio
      console.log(results)
    })
    res.render('index')
  })

  // Create a new example
  app.post('/api/examples', (req, res) => {
    res.render('index')
  })

  // Delete an example by id
  app.delete('/api/examples/:id', (req, res) => {
    res.render('index')
  })
}
