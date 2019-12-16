const mongoose = require('mongoose')

const { Schema } = mongoose

const ArticleSchema = new Schema({
  // title of article
  title: {
    type: String,
    required: true
  },
  // link to article
  link: {
    type: String,
    required: true
  },
  // saved status
  saved: {
    type: Boolean,
    default: false
  },
  // summary of story
  body: {
    type: String,
    required: true
  },
  // comments array
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

const Article = mongoose.model('Article', ArticleSchema)

module.exports = Article
