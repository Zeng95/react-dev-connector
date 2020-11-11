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
        msg: 'There are no posts existing'
      })
    }

    res.status(200).json({
      success: true,
      msg: 'Get all posts successfully',
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
    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({
        success: false,
        msg: 'Post not found'
      })
    }

    res.status(200).json({
      success: true,
      msg: 'Get the post successfully',
      profiles
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
      check('title', 'The title is required').not().isEmpty().trim().escape(),

      check('content', 'The content is required')
        .not()
        .isEmpty()
        .trim()
        .escape()
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

      const foundUser = await User.findById(req.userId).select('-password')
      const postFields = {
        ...req.body,
        user: foundUser['_id'],
        avatar: foundUser.avatar,
        username: foundUser.username
      }
      const post = new Post(postFields)
      const savedPost = await post.save()
      const foundPost = await Post.findOne({ user: savedPost.user }).select(
        '-__v -user'
      )

      res.status(200).json({
        success: true,
        msg: 'Create a new post successfully',
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
 * @route    Put api/articles/like/:id
 * @desc     Like a post
 * @access   Private
 */
router.put('/like/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.userId
    const postId = req.params.id

    const foundPost = await Post.findById(postId)

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

    await Post.findByIdAndUpdate(postId, foundPost)

    res.status(200).json({
      success: true,
      msg: 'Liked a post successfully',
      likes: foundPost.likes
    })
  } catch (err) {
    console.log(err)
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

    // Check if the post has not been liked
    const index = foundPost.likes.findIndex(like => {
      return like.user.toString() === userId
    })

    if (index === -1) {
      return res.status(400).json({
        success: false,
        msg: 'Post has not yet been liked'
      })
    }

    foundPost.likes.splice(index, 1)

    await Post.findByIdAndUpdate(postId, foundPost)

    res.status(200).json({
      success: true,
      msg: 'Unliked a post successfully',
      likes: foundPost.likes
    })
  } catch (err) {
    console.log(err)
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
