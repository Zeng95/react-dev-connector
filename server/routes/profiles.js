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
        experience: true,
        education: true,
        skills: true,
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
    const findedProfile = await Profile.findOne(
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
    const newProfile = findedProfile.transform()

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

module.exports = router
