const gradient = require('gradient-string')
const axios = require('axios')
const cheerio = require('cheerio')
const db = require('../models')

const urlPrefix = 'https://www.nytimes.com'

module.exports = (app) => {
  app.get('/scrape', (req, res) => {
    const results = []
    const saved = false
    axios.get('https://nytimes.com/').then((response) => {
      const $ = cheerio.load(response.data)
      $('div.assetWrapper').each((i, element) => {
        const title = $(element)
          .find('h2')
          .text()
        const link = urlPrefix + $(element).find('a').attr('href')
        const body = $(element).find('p').text()
        console.log('body found', body)
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
    })
    console.log(results)
    res.render('index')
  })

  app.post('/api/examples', (req, res) => res.render('index'))

  app.delete('/api/examples/:id', (req, res) => res.render('index'))
}
