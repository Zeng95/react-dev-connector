const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { SECRET } = require('../config/auth')

exports.verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization']

  if (!bearerHeader) {
    return res.status(403).send({ message: 'No token provided' })
  }

  try {
    const decoded = await jwt.verify(bearerHeader, SECRET)

    req.userId = decoded.userId

    next()
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
}
