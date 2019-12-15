const mongoose = require('mongoose')

const { Schema } = mongoose

const CommentSchema = new Schema({
  title: String,
  body: String,
  commentCreated: {
    type: Date,
    default: Date.now
  }
})

const Comment = mongoose.model('Comment', CommentSchema)


module.exports = Comment
