const mongoose = require('mongoose')
const { Schema, model } = mongoose
const SchemaObjectId = Schema.Types.ObjectId

const postSchema = new Schema({
  // We have a user connected to a post
  user: {
    type: SchemaObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  // The avatar of the user
  avatar: {
    type: String
  },
  // The name of the user
  username: {
    type: String
  },
  likes: [
    {
      user: {
        type: SchemaObjectId,
        ref: 'User'
      }
    }
  ],
  comments: [
    {
      user: {
        type: SchemaObjectId,
        ref: 'User'
      },
      // The text of a comment
      text: {
        type: String,
        required: true
      },
      username: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = model('Post', postSchema)
