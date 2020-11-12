const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const { verifyToken } = require('../middlewares/auth')

const Post = require('../models/Post')
const User = require('../models/User')

/**
 * @route    GET api/articles/all
 * @desc     Get all posts
 * @access   Public
 */
router.get('/all', async (req, res) => {
  try {
    // Descending: the sort will be the most recent dates to the oldest/earliest dates.
    const posts = await Post.find().sort({ date: -1 }).select('-__v')

    if (posts.length === 0) {
      return res.status(404).json({
        success: false,
        msg: 'Posts not found'
      })
    }

    res.status(200).json({
      success: true,
      msg: 'Got all posts successfully',
      posts
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 * @route    POST api/articles/:id
 * @desc     Get a single published post given its id
 * @access   Public
 */
router.get('/:id', async (req, res) => {
  try {
    const postId = req.params.id
    const foundPost = await Post.findById(postId).select('-__v')

    if (foundPost === null) {
      return res.status(404).json({
        success: false,
        msg: 'Post not found'
      })
    }

    res.status(200).json({
      success: true,
      msg: 'Got the post successfully',
      post: foundPost
    })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        msg: 'Post not found'
      })
    }

    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 * @route    POST api/articles
 * @desc     Create a new post
 * @access   Private
 */
router.post(
  '/',
  [
    verifyToken,
    [
      check('title', 'Title is required').not().isEmpty().trim().escape(),
      check('content', 'Content is required').not().isEmpty().trim().escape()
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        })
      }

      const userId = req.userId
      const foundUser = await User.findById(userId).select('-password')
      const postFields = {
        ...req.body,
        user: foundUser['_id'],
        avatar: foundUser.avatar,
        username: foundUser.username
      }
      const post = new Post(postFields)
      const savedPost = await post.save()
      const foundPost = await Post.findById(savedPost['_id']).select('-__v')

      res.status(200).json({
        success: true,
        msg: 'Created a new post successfully',
        post: foundPost
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        msg: `Server Error: ${err.message}`
      })
    }
  }
)

/**
 * @route    Post api/articles/comment/:id
 * @desc     Comment on a post
 * @access   Private
 */
router.post(
  '/comment/:id',
  [
    verifyToken,
    [check('text', 'Text is required').not().isEmpty().trim().escape()]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        })
      }

      const userId = req.userId
      const postId = req.params.id

      const foundUser = await User.findById(userId).select('-password')
      const foundPost = await Post.findById(postId)

      if (foundPost === null) {
        return res.status(404).json({
          success: false,
          msg: 'Post not found'
        })
      }

      const commentFields = {
        user: foundUser['_id'],
        avatar: foundUser.avatar,
        username: foundUser.username,
        text: req.body.text
      }
      foundPost.comments.unshift(commentFields)

      const updatedPost = await Post.findByIdAndUpdate(postId, foundPost, {
        new: true
      })

      res.status(200).json({
        success: true,
        msg: 'Created a new comment successfully',
        post: updatedPost
      })
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          msg: 'Post not found'
        })
      }

      res.status(500).json({
        success: false,
        msg: `Server Error: ${err.message}`
      })
    }
  }
)

/**
 * @route    Put api/articles/like/:id
 * @desc     Like a post
 * @access   Private
 */
router.put('/like/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.userId
    const postId = req.params.id

    const foundPost = await Post.findById(postId)

    if (foundPost === null) {
      return res.status(404).json({
        success: false,
        msg: 'Post not found'
      })
    }

    // Check if the post has already been liked
    const index = foundPost.likes.findIndex(like => {
      return like.user.toString() === userId
    })

    if (index !== -1) {
      return res.status(400).json({
        success: false,
        msg: 'Post has already been liked'
      })
    }

    foundPost.likes.unshift({ user: userId })

    const updatedPost = await Post.findByIdAndUpdate(postId, foundPost, {
      new: true
    })

    res.status(200).json({
      success: true,
      msg: 'Liked a post successfully',
      post: updatedPost
    })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        msg: 'Post not found'
      })
    }

    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 * @route    Put api/articles/unlike/:id
 * @desc     Unlike a post
 * @access   Private
 */
router.put('/unlike/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.userId
    const postId = req.params.id

    const foundPost = await Post.findById(postId)

    if (foundPost === null) {
      return res.status(404).json({
        success: false,
        msg: 'Post not found'
      })
    }

    if (foundPost.likes.length === 0) {
      return res.status(400).json({
        success: false,
        msg: 'Post has not yet been liked'
      })
    }

    // Check if the post has not been liked
    const removeIndex = foundPost.likes.findIndex(like => {
      return like.user.toString() === userId
    })

    if (removeIndex === -1) {
      return res.status(400).json({
        success: false,
        msg: 'Post has not yet been liked'
      })
    }

    foundPost.likes.splice(removeIndex, 1)

    const updatedPost = await Post.findByIdAndUpdate(postId, foundPost, {
      new: true
    })

    res.status(200).json({
      success: true,
      msg: 'Unliked a post successfully',
      post: updatedPost
    })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        msg: 'Post not found'
      })
    }

    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 * @route    Delete api/articles/:id
 * @desc     Delete a single published post given its id
 * @access   Private
 */
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.userId
    const postId = req.params.id
    const foundPost = await Post.findById(postId)

    if (foundPost === null) {
      return res.status(404).json({
        success: false,
        msg: 'Post not found'
      })
    }

    if (foundPost.user.toString() !== userId) {
      return res.status(401).json({
        success: false,
        msg: 'User not authorized'
      })
    }

    await foundPost.remove()

    res.status(200).json({
      success: true,
      msg: 'Deleted the post successfully'
    })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        msg: 'Post not found'
      })
    }

    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 * @route    Delete api/articles/comment/:id/:comment_id
 * @desc     Delete a comment
 * @access   Private
 */
router.delete('/comment/:id/:comment_id', verifyToken, async (req, res) => {
  try {
    const userId = req.userId
    const postId = req.params.id
    const commentId = req.params.comment_id

    const foundPost = await Post.findById(postId)

    if (foundPost === null) {
      return res.status(404).json({
        success: false,
        msg: 'Post not found'
      })
    }

    if (foundPost.comments.length === 0) {
      return res.status(404).json({
        success: false,
        msg: 'Comment not found'
      })
    }

    const comment = foundPost.comments.find(item => {
      return item['_id'].toString() === commentId
    })

    // Make sure omment exists
    if (!comment) {
      return res.status(404).json({
        success: false,
        msg: 'Comment not found'
      })
    }

    // Check user
    if (comment.user.toString() !== userId) {
      return res.status(401).json({
        success: false,
        msg: 'User not authorized'
      })
    }

    const removeIndex = foundPost.comments.findIndex(item => {
      return item['_id'].toString() === commentId
    })

    // Delete the comment
    foundPost.comments.splice(removeIndex, 1)

    const updatedPost = await Post.findByIdAndUpdate(postId, foundPost, {
      new: true
    })

    res.status(200).json({
      success: true,
      msg: 'Deleted the comment successfully',
      post: updatedPost
    })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        msg: 'Post not found'
      })
    }

    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

module.exports = router
