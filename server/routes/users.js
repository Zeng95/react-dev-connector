const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth')

const UserModel = require('../models/User')

/**
 * @route    GET api/users/me
 * @desc     Get the authenticated user
 * @access   Private
 */
router.get('/me', verifyToken, async (req, res) => {
  try {
    const userId = req.userId
    const user = await UserModel.findById(userId).select('-__v -password')

    if (!user) {
      res.status(404).json({
        success: true,
        msg: 'Authentication failure'
      })
    }

    res.status(200).json({
      success: true,
      msg: 'Authentication successful',
      user
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server error: ${err.message}`
    })
  }
})

module.exports = router
