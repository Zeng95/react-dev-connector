const express = require('express')
const router = express.Router()

/**
 * @route    GET api/auth
 * @desc     Register user
 * @access   Public
 */
router.post('/register', (req, res) => {
  res.send('Auth route')
})

module.exports = router
