const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth')

const User = require('../models/User')
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
      ['avatar', 'email', 'username']
    )

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
    newProfile.social = profile.social

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
      msg: `Server Error: ${err.message}`
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
      instgram,
      weibo
    } = req.body
    const user = await User.findById(req.userId)
    const newUser = {
      id: user._id,
      email: user.email,
      avatar: user.avatar,
      username: user.username
    }
    const profileFields = { user: req.userId, status }

    profileFields.skills = skills
      .split(',')
      .filter(skill => skill.trim() !== '')
      .map(skill => skill.trim())

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
    if (weibo) profileFields.social.instgram = weibo

    // Create
    const profile = new Profile(profileFields)
    const savedProfile = await profile.save()
    const newProfile = { ...profileFields }

    newProfile.id = savedProfile._id
    newProfile.user = newUser

    if (Object.entries(profileFields.social).length !== 0) {
      newProfile.social = savedProfile.social
    } else {
      delete newProfile.social
    }

    res.status(201).json({
      success: true,
      msg: 'You have successfully created your profile',
      profile: newProfile
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
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
      status,
      website,
      company,
      location,
      skills,
      githubusername,
      bio,
      twitter,
      facebook,
      linkedin,
      youtube,
      instgram,
      weibo
    } = req.body
    const user = await User.findById(req.userId)
    const newUser = {
      id: user._id,
      email: user.email,
      avatar: user.avatar,
      username: user.username
    }
    const profileFields = { user: req.userId, status }

    profileFields.skills = skills
      .split(',')
      .filter(skill => skill.trim() !== '')
      .map(skill => skill.trim())

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
    if (weibo) profileFields.social.instgram = weibo

    // Update
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.userId },
      profileFields,
      { new: true }
    )
    const newProfile = { ...profileFields }

    newProfile.id = updatedProfile._id
    newProfile.user = newUser

    if (Object.entries(profileFields.social).length !== 0) {
      newProfile.social = updatedProfile.social
    } else {
      delete newProfile.social
    }

    res.status(201).json({
      success: true,
      msg: 'You have successfully updated your profile',
      profile: newProfile
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

module.exports = router
