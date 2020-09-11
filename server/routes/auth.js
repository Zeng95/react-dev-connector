const express = require('express')
const router = express.Router()
const UserModell = require('../models/User')
const { verifyToken } = require('../middlewares/auth')

/**
 * @route    GET api/auth
 * @desc     Test route
 * @access   Public
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    const user = await UserModell.findById(req.userId).select('-password')

    return res.status(200).json({
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
