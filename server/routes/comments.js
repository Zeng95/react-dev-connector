const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const { verifyToken } = require('../middlewares/auth')

const Post = require('../models/Post')

/**
 * @route    POST api/comments
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
      res.status(500).json({
        success: false,
        msg: `Server Error: ${err.message}`
      })
    }
  }
)

module.exports = router
