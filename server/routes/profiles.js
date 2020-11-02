const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middlewares/auth')

const User = require('../models/User')
const Profile = require('../models/Profile')

/**
 * @route   GET api/profiles/all
 * @desc    Get all the profiles
 * @access  Public
 */
router.get('/all', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'avatar',
      'email',
      'username'
    ])

    if (!profiles) {
      return res.status(404).json({
        success: false,
        msg: 'There are no profiles existing'
      })
    }

    res.status(200).json({
      success: true,
      msg: 'Get all the profiles successfully',
      profiles
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 * @route   GET api/profiles/:userId
 * @desc    Get a profile by a user's id
 * @access  Public
 */
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    const profile = await Profile.findOne({ user: userId })
      .populate('user', ['avatar', 'email', 'username'])
      .select('-__v -date')

    if (!profile) {
      return res.status(404).json({
        success: false,
        msg: 'Profile not found'
      })
    }

    res.status(200).json({
      success: true,
      msg: "Get the user's profile successfully",
      profile
    })
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        msg: 'Profile not found'
      })
    }

    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 * @route   GET api/profiles/github
 * @desc    Get user repos from Github
 * @access  Public
 */
router.get('/github', async (req, res) => {
  try {
    console.log(1)
    const { username } = req.params
    const options = {
      uri: encodeURI(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
      ),
      method: 'GET',
      headers: {
        'user-agent': 'node.js',
        Authorization: `token ${config.get('githubToken')}`
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 *
 * @route   GET api/profiles/me
 * @desc    Get the authenticated user's profile
 * @access  Private
 */
router.get('/me', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId })
      .populate('user', ['avatar', 'email', 'username'])
      .select('-__v -date')

    if (!profile) {
      return res.status(404).json({
        success: false,
        msg: 'There is no profile for this user'
      })
    }

    res.status(200).json({
      success: true,
      msg: "Get the user's profile successfully",
      profile
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
    if (weibo) profileFields.social.weibo = weibo

    // Create
    const profile = new Profile(profileFields)
    const savedProfile = await profile.save()
    const foundProfile = await Profile.findOne({ user: savedProfile.user })
      .populate('user', ['avatar', 'email', 'username'])
      .select('-__v -date')

    res.status(201).json({
      success: true,
      msg: 'You have successfully created your profile',
      profile: foundProfile
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 * @route   Put api/profiles
 * @desc    Update an existing user's profile
 * @access  Private
 */
router.put('/', verifyToken, async (req, res) => {
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
      .populate('user', ['avatar', 'email', 'username'])
      .select('-__v -date')

    res.status(201).json({
      success: true,
      msg: 'You have successfully updated your profile',
      profile: updatedProfile
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 * @route   Put api/profiles/experience
 * @desc    Add an experience to an existing user's profile
 * @access  Private
 */
router.put('/experience', verifyToken, async (req, res) => {
  try {
    const experienceFields = { ...req.body }
    const profile = await Profile.findOne({ user: req.userId })

    profile.experience.unshift(experienceFields)

    // Update
    const savedProfile = await profile.save()
    const foundProfile = await Profile.findOne({ user: savedProfile.user })
      .populate('user', ['avatar', 'email', 'username'])
      .select('-__v -date')

    res.status(201).json({
      success: true,
      msg: 'You have successfully added an experience to your profile',
      profile: foundProfile
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 * @route   Put api/profiles/education
 * @desc    Add an education to an existing user's profile
 * @access  Private
 */
router.put('/education', verifyToken, async (req, res) => {
  try {
    const educationFields = { ...req.body }
    const profile = await Profile.findOne({ user: req.userId })

    profile.education.unshift(educationFields)

    // Update
    const savedProfile = await profile.save()
    const foundProfile = await Profile.findOne({ user: savedProfile.user })
      .populate('user', ['avatar', 'email', 'username'])
      .select('-__v -date')

    res.status(201).json({
      success: true,
      msg: 'You have successfully added an education to your profile',
      profile: foundProfile
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 * @route   Delete api/profiles/experience/:id
 * @desc    Delete an experience from an existing user's profile
 * @access  Private
 */
router.delete('/experience/:id', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId })
    const experienceId = req.params.id
    const removeIndex = profile.experience.findIndex(item => {
      return experienceId === item['_id'].toString()
    })

    if (removeIndex === -1) {
      return res.status(404).json({
        success: false,
        msg: 'Please send correct experience id'
      })
    }

    // Delete
    profile.experience.splice(removeIndex, 1)

    // Update
    const savedProfile = await profile.save()
    const foundProfile = await Profile.findOne({ user: savedProfile.user })
      .populate('user', ['avatar', 'email', 'username'])
      .select('-__v -date')

    res.status(201).json({
      success: true,
      msg: 'You have successfully deleted an experience from your profile',
      profile: foundProfile
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 * @route   Delete api/profiles/education/:id
 * @desc    Delete an education from an existing user's profile
 * @access  Private
 */
router.delete('/education/:id', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId })
    const educationId = req.params.id
    const removeIndex = profile.education.findIndex(item => {
      return educationId === item['_id'].toString()
    })

    if (removeIndex === -1) {
      return res.status(404).json({
        success: false,
        msg: 'Please send correct educationId id'
      })
    }

    // Delete
    profile.education.splice(removeIndex, 1)

    // Update
    const savedProfile = await profile.save()
    const foundProfile = await Profile.findOne({ user: savedProfile.user })
      .populate('user', ['avatar', 'email', 'username'])
      .select('-__v -date')

    res.status(201).json({
      success: true,
      msg: 'You have successfully deleted an education from your profile',
      profile: foundProfile
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

/**
 * @route   Delete api/profiles/me
 * @desc    Delete an existing user account
 * @access  Private
 */
router.delete('/me', verifyToken, async (req, res) => {
  try {
    // Remove user posts

    // Remove profile
    await Profile.findOneAndRemove({ user: req.userId })

    // Remove user
    await User.findByIdAndRemove(req.userId)

    res.status(201).json({
      success: true,
      msg: 'User deleted successfully'
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

module.exports = router
