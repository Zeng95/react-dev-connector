const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth')

const ProfileModel = require('../models/Profile')

/**
 * @route    GET api/profile/me
 * @desc     Get current user profile
 * @access   Private
 */
router.get('/me', verifyToken, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({
      user: req.userId
    }).populate('user', ['name', 'avatar'])

    if (!profile) {
      res
        .status(404)
        .json({ success: false, msg: 'There is no profile for this user' })
    }

    res
      .status(200)
      .json({ success: true, msg: 'Get user profile successfully', profile })
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: `Server error: ${err.message}` })
  }
})

module.exports = router
