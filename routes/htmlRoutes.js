/* eslint-disable no-unused-vars */

// Require all models
const axios = require('axios')
const cheerio = require('cheerio')
const db = require('../models')

module.exports = (app) => {
  // Load index page
  app.get('/', (req, res) => {
    res.render('index')
  })

  // Load example page and pass in an example by id
  app.get('/example/:id', (req, res) => {
    res.render('index')
  })

  // Render 404 page for any unmatched routes
  app.get('*', (req, res) => {
    res.render('404')
  })
}
