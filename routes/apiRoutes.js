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
    console.log('scrape route hit')
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
    console.log('Id to be saved', savedID)
    db.Article.findOneAndUpdate({ _id: savedID }, { $set: { saved: true } })
      .then((dbArticle) => {
        console.log('Article saved', dbArticle)
        res.sendStatus(200)
      })
      .catch((err) => {
        res.json(err)
      })
  })

  // ===========================================================================
  // Get an article and pull its comments
  // ===========================================================================
  app.get('/api/comments/:id', (req, res) => {
    console.log('Get an article and populate it comments route hit')
    const savedID = req.params.id
    console.log('Id to be saved', savedID)
    db.Article.findOne({ _id: savedID })
      .populate('comments')
      .then((dbArticle) => {
        console.log('these are the comments found', dbArticle)
        const handObj = {
          article: dbArticle,
          comments: dbArticle.comments
        }
        res.render('partials/modals/comments', handObj)
      })
      .catch((err) => {
        res.json(err)
      })
  })

  // =============================================================================
  //  Create a comment and add it to the article.
  // =============================================================================
  app.post('/api/comments/', (req, res) => {
    console.log(req.body)
    const { articleID, ...newComment } = req.body
    console.log('this is the new', newComment)
    db.Comment.create(newComment)
      .then((dbComment) => {
        console.log('This is the comment created', dbComment)
        return db.Article.findOneAndUpdate({ _id: articleID },
          { $push: { comments: dbComment._id } }, { new: true })
          .then((dbArticle) => {
            const hbrsOBJ = {
              articles: dbArticle,
              comments: dbArticle.comments
            }
            res.render('partials/modals/comments', hbrsOBJ)
            console.log('This is dbArticle', dbArticle)
          })
          .catch((err) => {
            res.json(err)
          })
      })
  })
}
