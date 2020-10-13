const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth')

const Profile = require('../models/Profile')

/**
 * @route   GET api/profiles/me
 * @desc    Get the authenticated user's profile
 * @access  Private
 */
router.get('/me', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId })
      .select('-__v -date')
      .populate('user', ['avatar', 'email', 'username'])

    if (!profile) {
      return res.status(404).json({
        success: false,
        msg: 'There is no profile for this user'
      })
    }

    const newProfile = {}

    newProfile.id = profile._id
    newProfile.status = profile.status
    newProfile.company = profile.company
    newProfile.webiste = profile.website
    newProfile.location = profile.location
    newProfile.skills = profile.skills
    newProfile.githubusername = profile.githubusername
    newProfile.bio = profile.bio

    newProfile.user = {}
    newProfile.user.id = profile.user._id
    newProfile.user.avatar = profile.user.avatar
    newProfile.user.email = profile.user.email
    newProfile.user.username = profile.user.username

    res.status(200).json({
      success: true,
      msg: 'Get the users profile successfully',
      profile: newProfile
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
router.post('/', verifyToken, async (req, res) => {
  try {
    const {
      status,
      company,
      website,
      location,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instgram
    } = req.body
    const profileFields = { user: req.userId, status }

    profileFields.skills = skills
      .split(',')
      .filter(skill => skill.trim() !== '')
      .map(skill => skill.tirm())

    if (website) profileFields.website = website
    if (company) profileFields.company = company
    if (location) profileFields.location = location
    if (githubusername) profileFields.githubusername = githubusername
    if (bio) profileFields.bio = bio

    profileFields.social = {}

    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (youtube) profileFields.social.youtube = youtube
    if (instgram) profileFields.social.instgram = instgram

    // Create
    const profile = new Profile(profileFields)
    const savedProfile = await profile.save()
    const newProfile = {}

    newProfile.id = savedProfile._id
    newProfile.status = savedProfile.status
    newProfile.company = savedProfile.company
    newProfile.webiste = savedProfile.website
    newProfile.location = savedProfile.location
    newProfile.skills = savedProfile.skills
    newProfile.githubusername = savedProfile.githubusername
    newProfile.bio = savedProfile.bio
    newProfile.social = savedProfile.social

    res.status(201).json({
      success: true,
      msg: 'You have successfully created your profile',
      profile: newProfile
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server error: ${err.message}`
    })
  }
})

/**
 * @route   Put api/profiles/{userId}
 * @desc    Update an existing user's profile
 * @access  Private
 */
router.put('/:userId', verifyToken, async (req, res) => {
  try {
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
})

module.exports = router
