// Require all models
const gradient = require('gradient-string')
const db = require('../models')

module.exports = (app) => {
  app.get('/', (req, res) => {
    db.Article.find({})
      .then((dbArticle) => {

        console.log(dbArticle)
        const hbrsOBJ = {
          articles: [dbArticle]
        }
        console.log('dherefadsfasdfadfadfasdf', hbrsOBJ)
        res.render('index', hbrsOBJ)
      })
      .catch((err) => {
        res.json(err)
      })
  })


  // Load example page and pass in an example by id
  app.get('/example/:id', (req, res) => res.render('index'))

  // Render 404 page for any unmatched routes
  app.get('*', (req, res) => res.render('404'))
}
