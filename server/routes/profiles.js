const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth')
const { check, validationResult } = require('express-validator')

const Profile = require('../models/Profile')

/**
 * @route   GET api/profiles/me
 * @desc    Get the authenticated user's profile
 * @access  Private
 */
router.get('/me', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId }).populate(
      'user',
      ['username', 'avatar']
    )

    if (!profile) {
      return res.status(404).json({
        success: false,
        msg: 'There is no profile for this user'
      })
    }

    res.status(200).json({
      success: true,
      msg: 'Get the users profile successfully',
      profile
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server error: ${err.message}`
    })
  }
})

/**
 * @route   POST api/profiles
 * @desc    Create a new user's profile
 * @access  Private
 */
router.post(
  '/',
  [
    verifyToken,
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty()
  ],
  async (req, res) => {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
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

      profileFields.social = {}

      // Create
      const newProfile = new Profile(profileFields)
      const savedProfile = await newProfile.save()

      res.status(201).json({
        success: true,
        msg: 'You have successfully created your profile',
        profile: savedProfile
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        msg: `Server error: ${err.message}`
      })
    }
  }
)

/**
 * @route   Put api/profiles/{userId}
 * @desc    Update an existing user's profile
 * @access  Private
 */
router.put(
  '/:userId',
  [
    verifyToken,
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty()
  ],
  async (req, res) => {
    try {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() })
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

      profileFields.social = {}

      // Update
      const newProfile = new Profile(profileFields)
      const savedProfile = await newProfile.save()

      res.status(201).json({
        success: true,
        msg: 'You have successfully created your profile',
        profile: savedProfile
      })
    } catch (err) {
      res.status(500).json({
        success: false,
        msg: `Server error: ${err.message}`
      })
    }
  }
)

module.exports = router
