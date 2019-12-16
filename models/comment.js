const mongoose = require('mongoose')

const { Schema } = mongoose

const CommentSchema = new Schema({
  // Title or subject of comment
  title: {
    type: String
  },
  // body of comment
  body: {
    type: String
  },
  // date of comment
  commentCreated: {
    type: Date,
    default: Date.now
  }
})

const Comment = mongoose.model('Comment', CommentSchema)
module.exports = Comment
