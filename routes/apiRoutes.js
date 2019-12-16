/* eslint-disable no-underscore-dangle */
const gradient = require('gradient-string')
const axios = require('axios')
const cheerio = require('cheerio')
const db = require('../models')

const urlPrefix = 'https://www.nytimes.com'

module.exports = (app) => {
  // ===========================================================================
  // Scrape Route
  // ===========================================================================
  app.get('/api/scrape', (req, res) => {
    const results = []
    const saved = false
    axios.get('https://nytimes.com/').then((response) => {
      const $ = cheerio.load(response.data)

      $('div.assetWrapper').each((i, element) => {
        const title = $(element)
          .find('h2')
          .text()
        const link = urlPrefix
          + $(element)
            .find('a')
            .attr('href')
        const body = $(element)
          .find('p')
          .text()
        const result = {
          title,
          link,
          body,
          saved
        }
        results.push(result)
        if (title && link && body) {
          db.Article.create(result)
            .then((dbArticle) => {
              console.log(dbArticle)
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
      console.log(gradient.vice('Scraped'))
    })
    res.sendStatus(200)
  })

  // =============================================================================
  // Clear Database route
  // =============================================================================

  app.get('/api/clear', (req, res) => {
    console.log('clear route hit', req.params)
    db.Article.deleteMany({}, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(gradient.vice('articles cleared'))
      }
    }).then(() => {
      db.Comment.deleteMany({}, (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log(gradient.vice('comments cleared'))
        }
      })
      res.sendStatus(200)
    })
  })

  // ===========================================================================
  // Save an article
  // ===========================================================================
  app.post('/api/save/:id', (req, res) => {
    console.log('save route hit')
    const savedID = req.params.id
    db.Article.findOneAndUpdate({ _id: savedID }, { $set: { saved: true } })
      .then((dbArticle) => {
        console.log('Article saved', dbArticle)
        res.sendStatus(200)
      })
      .catch((err) => {
        res.json(err)
      })
  })
}
