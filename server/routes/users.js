const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const UserModel = require('../models/User')
const { check, validationResult } = require('express-validator')

/**
 * @route    GET api/users/register
 * @desc     Register user
 * @access   Public
 */
router.post(
  '/register',
  [
    check('username')
      .not()
      .isEmpty()
      .trim()
      .escape()
      .withMessage('username is required'),

    check('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('please include a valid email')
      // Check if e-mail is in use
      .custom(value => {
        return UserModel.findOne({ email: value }).then(user => {
          if (user) {
            return Promise.reject('email already in use')
          }
        })
      }),

    check('password')
      .isLength({ min: 6 })
      .withMessage('must be at least 6 chars long')
      .matches(/\d/)
      .withMessage('must contain a number')
  ],
  async (req, res) => {
    const { email, username, password } = req.body
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Get user gravatr
    const avatar = gravatar.url(email, {
      protocol: 'https',
      s: '200',
      d: 'retro'
    })

    const user = new UserModel({ email, username, password, avatar })
    const salt = bcrypt.genSaltSync(10)
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

          return res.status(200).json({ token })
        }
      )
    } catch (err) {
      res.status(500).send('Server error')
    }
  }
)

module.exports = router
