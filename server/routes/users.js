const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const { verifyToken } = require('../middlewares/auth')
const config = require('config')

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

/**
 * @route   POST api/users/register
 * @desc    Register user
 * @access  Public
 */
router.post(
  '/register',
  [
    check('email', 'Please include a valid email')
      .isEmail()
      .normalizeEmail()
      .custom(email => {
        return UserModel.findOne({ email }).then(user => {
          if (user) return Promise.reject('The email is already in use')
        })
      }),

    check('username', 'Username is required')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .custom(username => {
        return UserModel.findOne({ username }).then(user => {
          if (user) return Promise.reject('The username is already in use')
        })
      }),

    check('password', 'The password must be 6 chars long and contain a number')
      .trim()
      .isLength({ min: 6 })
      .matches(/\d/)
      .not()
      .isIn(['123456'])
      .withMessage('Do not use a common word as the password')
  ],
  async (req, res) => {
    try {
      const { email, username, password } = req.body
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        })
      }

      // Get user default gravatr
      const avatar = gravatar.url(email, {
        protocol: 'https',
        s: '200',
        d: 'retro'
      })

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const newUser = new UserModel({
        avatar,
        email,
        username,
        password: hashedPassword
      })
      const savedUser = await newUser.save()
      const payload = { userId: savedUser['_id'] }

      // Generate a signed JSON web token with the user id and return it in the response
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '3h' },
        (err, token) => {
          if (err) throw err

          res.status(200).json({
            success: true,
            msg: 'Signed up successfully',
            token
          })
        }
      )
    } catch (err) {
      res.status(500).json({
        success: false,
        msg: `Server error: ${err.message}`
      })
    }
  }
)

/**
 * @route   POST api/users/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post(
  '/login',
  [
    check('email', 'Please include a valid email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .custom(email => {
        return UserModel.findOne({ email }).then(user => {
          if (!user) return Promise.reject('Invalid credentials')
        })
      }),

    check('password', 'The password must be 6 chars long')
      .trim()
      .isLength({ min: 6 })
  ],
  async (req, res) => {
    try {
      const { email, password } = req.body
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array()
        })
      }

      const user = await UserModel.findOne({ email })
      const isMatch = await user.comparePassword(password)

      // 如果密码不匹配则返回 403
      if (!isMatch) {
        return res.status(403).json({
          success: false,
          msg: 'Invalid credentials'
        })
      }

      const payload = { userId: user['_id'] }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '3h' },
        (err, token) => {
          if (err) throw err

          res.status(200).json({
            success: true,
            msg: 'Logged in successfully',
            token
          })
        }
      )
    } catch (err) {
      res.status(500).json({
        success: false,
        msg: `Server error: ${err.message}`
      })
    }
  }
)

module.exports = router
