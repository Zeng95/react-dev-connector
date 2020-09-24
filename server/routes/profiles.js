const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth')
const { check, validationResult } = require('express-validator')

const Profile = require('../models/Profile')

/**
 * @route   GET api/profiles/me
 * @desc    Get current users profile
 * @access  Private
 */
router.get('/me', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId }).populate(
      'user',
      ['username', 'avatar']
    )

    if (!profile) {
      res.status(404).json({
        success: false,
        msg: 'There is no profile for this user'
      })
    }

    res.status(200).json({
      success: true,
      msg: 'Get the users profile successfully',
      profile
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: `Server error: ${err.message}`
    })
  }
})

/**
 * @route   POST api/profiles
 * @desc    Create or update users profile
 * @access  Private
 */
router.post(
  '/',
  [
    verifyToken,
    check('status').not().isEmpty().withMessage('Status is required'),
    check('skills').not().isEmpty().withMessage('Skills are required')
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      bio,
      status,
      skills,
      website,
      company,
      location,
      githubusername
    } = req.body
    const profileFields = { user: req.userId }

    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (skills) profileFields.skills = skills
    if (website) profileFields.website = website
    if (company) profileFields.company = company
    if (location) profileFields.location = location
    if (githubusername) profileFields.githubusername = githubusername

    res.status(200).json({ success: true, msg: 'Hello' })
  }
)

module.exports = router
