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
    const profile = await Profile.findOne(
      { user: req.userId },
      {
        _id: true,
        status: true,
        company: true,
        website: true,
        location: true,
        skills: true,
        githubusername: true,
        bio: true,
        experience: true,
        education: true,
        social: true
      }
    ).populate('user', ['avatar', 'email', 'username'])

    if (!profile) {
      return res.status(404).json({
        success: false,
        msg: 'There is no profile for this user'
      })
    }

    const newProfile = profile.transform()

    newProfile.user.id = profile.user['_id']
    delete newProfile.user['_id']

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
    const foundProfile = await Profile.findOne(
      { user: req.userId },
      {
        _id: true,
        status: true,
        experience: true,
        education: true,
        skills: true,
        social: true
      }
    ).populate('user', ['avatar', 'email', 'username'])
    const newProfile = foundProfile.transform()

    newProfile.user.id = savedProfile.user['_id']
    delete newProfile.user['_id']

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
      {
        fields: {
          _id: true,
          status: true,
          experience: true,
          education: true,
          skills: true,
          social: true
        },
        new: true
      }
    ).populate('user', ['avatar', 'email', 'username'])
    const newProfile = updatedProfile.transform()

    newProfile.user.id = updatedProfile.user['_id']
    delete newProfile.user['_id']

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
    const foundProfile = await Profile.findOne(
      { user: req.userId },
      {
        _id: true,
        status: true,
        company: true,
        website: true,
        location: true,
        skills: true,
        githubusername: true,
        bio: true,
        experience: true,
        education: true,
        social: true
      }
    ).populate('user', ['avatar', 'email', 'username'])
    const newProfile = foundProfile.transform()

    newProfile.user.id = savedProfile.user['_id']
    delete newProfile.user['_id']

    res.status(201).json({
      success: true,
      msg: 'You have successfully added an experience to your profile',
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
    const foundProfile = await Profile.findOne(
      { user: req.userId },
      {
        _id: true,
        status: true,
        skills: true,
        social: true,
        experience: true,
        education: true
      }
    ).populate('user', ['avatar', 'email', 'username'])
    const newProfile = foundProfile.transform()

    newProfile.user.id = savedProfile.user['_id']
    delete newProfile.user['_id']

    res.status(201).json({
      success: true,
      msg: 'You have successfully added an education to your profile',
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
 * @route   Delete api/profiles/experience/:id
 * @desc    Delete an experience from an existing user's profile
 * @access  Private
 */
router.delete('/experience/:id', verifyToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId })
    const experienceId = req.params.id
    const index = profile.experience.findIndex(item => {
      return experienceId === item['_id'].toString()
    })

    if (index === -1) {
      return res.status(404).json({
        success: false,
        msg: 'Please send correct experience id'
      })
    }

    // Delete
    profile.experience.splice(index, 1)

    // Update
    const savedProfile = await profile.save()
    const foundProfile = await Profile.findOne(
      { user: req.userId },
      {
        _id: true,
        status: true,
        company: true,
        website: true,
        location: true,
        skills: true,
        githubusername: true,
        bio: true,
        experience: true,
        education: true,
        social: true
      }
    ).populate('user', ['avatar', 'email', 'username'])
    const newProfile = foundProfile.transform()

    newProfile.user.id = savedProfile.user['_id']
    delete newProfile.user['_id']

    res.status(201).json({
      success: true,
      msg: 'You have successfully deleted an experience from your profile',
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
 * @route   Delete api/profiles/education/:id
 * @desc    Delete an education from an existing user's profile
 * @access  Private
 */
router.delete('/education/:id', verifyToken, async (req, res) => {
  try {
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: `Server Error: ${err.message}`
    })
  }
})

module.exports = router
