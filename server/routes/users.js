const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const UserModel = require('../models/User')

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
      .withMessage('must be at least 5 chars long')
      .matches(/\d/)
      .withMessage('must contain a number')
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req)
    const { email, username, password } = req.body

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

    // Encrypt password \ 加密密码
    user.password = bcrypt.hashSync(password, salt)

    try {
      const doc = await user.save()
      console.log(doc)
      res.send('User registered')
    } catch (err) {
      console.error(err)
    }
  }
)

module.exports = router
