// Require all models
const gradient = require('gradient-string')
const db = require('../models')

module.exports = (app) => {
  // ===========================================================================
  // Find all articles
  // ===========================================================================
  app.get('/', (req, res) => {
    console.log('the homepage route hit')
    db.Article.find({})
      .then((dbArticle) => {
        const hbrsOBJ = {
          articles: dbArticle
        }
        console.log('This is the handlebars object being sent.', hbrsOBJ)
        res.render('index', hbrsOBJ)
        console.log(gradient.summer('/ route rendered'))
      })
      .catch((err) => {
        res.json(err)
      })
  })
  // =============================================================================
  // Find all articles
  // =============================================================================
  app.get('/saved', (req, res) => {
    db.Article.find({})
      .then((dbArticle) => {
        const hbrsOBJ = {
          articles: dbArticle
        }
        console.log('This is the handlebars object being sent.', hbrsOBJ)
        res.render('saved', hbrsOBJ)
        console.log(gradient.summer('/saved route rendered'))
      })
      .catch((err) => {
        res.json(err)
      })
  })

  // Render 404 page for any unmatched routes
  app.get('*', (req, res) => res.render('404'))
}
