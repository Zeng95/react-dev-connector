const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const config = require('config')

const UserModel = require('../models/User')

/**
 * @route   POST api/users/register
 * @desc    Register user
 * @access  Public
 */
router.post(
  '/register',
  [
    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please include a valid email')
      // Check if email is in use
      .custom(value => {
        return UserModel.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject('Email already in use')
          }
        })
      }),

    check('username')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage('Username is required'),

    check('password')
      .isLength({ min: 6 })
      .withMessage('Must be at least 6 chars long')
      .matches(/\d/)
      .withMessage('Must contain a number')
  ],
  async (req, res) => {
    const { email, username, password } = req.body
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    // Get user gravatr
    const avatar = gravatar.url(email, {
      protocol: 'https',
      s: '200',
      d: 'retro'
    })

    const user = new UserModel({ email, username, password, avatar })
    const salt = bcrypt.genSaltSync(10)
    // 加密密码
    user.password = bcrypt.hashSync(password, salt)

    try {
      await user.save()

      const payload = { userId: user['_id'] }

      // Generate a signed JSON web token with the contents of user object and return it in the response
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err

          res
            .status(200)
            .json({ success: true, msg: 'User registered successfully', token })
        }
      )
    } catch (err) {
      res
        .status(500)
        .json({ success: false, msg: `Server error: ${err.message}` })
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
    check('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please include a valid email'),

    check('password').trim().notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    const { email, password } = req.body
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() })
    }

    try {
      const user = await UserModel.findOne({ email })

      // 如果邮箱不匹配则返回 404
      if (!user) {
        return res.status(404).json({ success: false, msg: 'Invalid credentials' })
      }

      const isMatch = await user.comparePassword(password)

      // 如果密码不匹配则返回 403
      if (!isMatch) {
        return res.status(403).json({ success: false, msg: 'Invalid credentials' })
      }

      const payload = { userId: user['_id'] }

      // Generate a signed JSON web token with the contents of user object and return it in the response
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '1h' },
        (err, token) => {
          if (err) throw err

          res
            .status(200)
            .json({ success: true, msg: 'User logged in successfully', token })
        }
      )
    } catch (err) {
      res
        .status(500)
        .json({ success: false, msg: `Server error: ${err.message}` })
    }
  }
)

module.exports = router
