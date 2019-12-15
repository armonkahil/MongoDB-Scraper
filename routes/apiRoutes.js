const gradient = require('gradient-string')
const axios = require('axios')
const cheerio = require('cheerio')
const db = require('../models')

const urlPrefix = 'https://www.nytimes.com'

module.exports = (app) => {
  app.get('/api/scrape', (req, res) => {
    console.log('scrape route hit')
    const results = []

    const saved = false
    axios.get('https://nytimes.com/').then((response) => {
      const $ = cheerio.load(response.data)

      $('div.assetWrapper').each((i, element) => {
        const title = $(element).find('h2').text()
        const link = urlPrefix + $(element).find('a').attr('href')
        const body = $(element).find('p').text()
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

  app.get('/api/clear', (req, res) => {
    db.Article.deleteMany({}, (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log(gradient.vice('articles cleared'))
      }
    })
      .then(() => {
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
  app.get('/api/save/:id', (req, res) => {
    console.log('save route hit')
    const savedID = req.params.id
    console.log('Id to be saved', savedID)
    db.Article.findOneAndUpdate({ _id: savedID }, { $set: { saved: true } })
      .populate('comment').then((dbArticle) => {
        console.log(dbArticle)
        res.sendStatus(200)
      }).catch((err) => {
        res.json(err)
      })
  })
}
