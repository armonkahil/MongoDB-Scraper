/* eslint-disable linebreak-style */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const gradient = require('gradient-string')
const db = require('../models')

module.exports = (app) => {
// ===========================================================================
  // Get an article and pull its comments
  // ===========================================================================
  app.get('/api/comments/:id', (req, res) => {
    console.log('Get an article and populate it comments route hit')
    const savedID = req.params.id
    console.log('Id to be saved', savedID)
    db.Article.findOne({ _id: savedID })
      .populate('comments')
      .then((dbComments) => {
        console.log(gradient.summer('these are the comments found', dbComments))

        console.log(JSON.stringify(dbComments, null, 2))
        res.render('partials/modals/comments', dbComments)
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
  // ===========================================================================
  // Delete a comment from an article
  // ===========================================================================
  app.get('/api/comments/delete/:id', (req, res) => {
    const targetId = req.params.id
    db.Comment.findOneAndDelete({ _id: targetId },
      (error, removed) => {
        // Log any errors from mongojs
        if (error) {
          console.log(error)
          res.send(error)
        } else {
          // Otherwise, send the mongojs response to the browser
          // This will fire off the success function of the ajax request
          console.log(removed)
          res.send(removed)
        }
      })
  })
}
