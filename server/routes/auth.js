const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const config = require('config')

const UserModel = require('../models/User')

/**
 * @route    POST api/auth/register_check/username
 * @desc     Check if username already exists in the database
 * @access   Public
 */
router.post('/register_check/username', async (req, res) => {
  try {
    const { username } = req.body
    const user = await UserModel.findOne({ username })

    if (user) {
      return res.status(401).json({
        success: false,
        msg: 'Username already exists'
      })
    }

    res.status(200).send(`${username} is available`)
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server error: ${err.message}`
    })
  }
})

/**
 * @route    POST api/auth/register_check/email
 * @desc     Check if email already exists in the database
 * @access   Public
 */
router.post('/register_check/email', async (req, res) => {
  try {
    const { email } = req.body
    const user = await UserModel.findOne({ email })

    if (user) {
      return res.status(401).json({
        success: false,
        msg: 'Email already exists'
      })
    }

    res.status(200).send(`${email} is available`)
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server error: ${err.message}`
    })
  }
})

/**
 * @route    POST api/auth/forgot
 * @desc     Recover Password - Generates token and Sends password reset email
 * @access   Public
 */
router.post('/forgot', async (req, res) => {
  try {
    const { email } = req.body
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(401).json({
        success: false,
        msg: `The email address ${email} is not associated with any account. Double-check your email address and try again.`
      })
    }

    // Generate and set password reset token
    user.generatePasswordReset()

    // Save the updated user object
    await user.save()

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: config.get('emailAddress'),
        pass: config.get('emailPassword')
      },
      tls: {
        rejectUnauthorized: false
      }
    })
    const message = {
      from: config.get('fromEmail'),
      to: `${user.email}`,
      subject: '[DevConnector] Please reset your password',
      text:
        `You are receiving this because you (or someone else) have requested the reset of the ${user.username} DevConnector user account.\n\n` +
        `Please click on the following link, or paste this into your browser to complete the process within three hours of receiving it:\n\n` +
        `http://localhost:3000/reset/${user.resetPasswordToken}\n\n` +
        `If you received this in error, you can safely ignore it.\n\n\n` +
        `Thanks,\nThe DevConnector Team`
    }

    // Send mail with a transporter object
    await transporter.sendMail(message)

    res.status(200).json({
      success: true,
      msg: `A reset email has been sent to ${user.email}.`
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server error: ${err.message}`
    })
  }
})

/**
 * @route    POST api/auth/reset
 * @desc     Reset Password - Validate password reset token and shows the password reset page
 * @access   Public
 */
router.post('/reset', async () => {
  try {
    const { token } = req.params
    console.log(token)
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server error: ${err.message}`
    })
  }
})

/**
 * @route   POST api/auth/register
 * @desc    Register user
 * @access  Public
 */
router.post(
  '/register',
  [
    check('email', 'Please include a valid email')
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail(),

    check('username', 'The username must be 2 chars')
      .not()
      .isEmpty()
      .isLength({ min: 2 })
      .trim()
      .escape(),

    check('password', 'The password must be 16 chars long and contain a number')
      .trim()
      .isLength({ min: 16 })
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
        { expiresIn: '3d' },
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
 * @route   POST api/auth/login
 * @desc    Authenticate user & return JWT token
 * @access  Public
 */
router.post(
  '/login',
  [
    check('email', 'Please include a valid email')
      .not()
      .isEmpty()
      .isEmail()
      .normalizeEmail(),

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
        { expiresIn: '3d' },
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
