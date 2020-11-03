const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

/**
 * @route    GET api/posts/all
 * @desc     Get all posts
 * @access   Public
 */
router.get('/all', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', [
      'avatar',
      'email',
      'username'
    ])

    if (!posts) {
      return res.status(404).json({
        success: false,
        msg: 'There are no posts existing'
      })
    }

    res.status(200).json({
      success: true,
      msg: 'Get all the posts successfully',
      profiles
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 * @route    POST api/posts
 * @desc     Create a new post
 * @access   Private
 */
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('user', [
      'avatar',
      'email',
      'username'
    ])

    if (!posts) {
      return res.status(404).json({
        success: false,
        msg: 'There are no posts existing'
      })
    }

    res.status(200).json({
      success: true,
      msg: 'Get all the posts successfully',
      profiles
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

module.exports = router
