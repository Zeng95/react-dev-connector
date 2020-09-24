const mongoose = require('mongoose')
const { Schema, model } = mongoose
const SchemaObjectId = Schema.Types.ObjectId

const postSchema = new Schema({
  user: {
    type: SchemaObjectId,
    ref: 'User'
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  avatar: {
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
      text: {
        type: String,
        required: true
      },
      name: {
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
